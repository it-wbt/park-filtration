// Configure these Script Properties before deploying the web app:
// SHEET_ID, RECIPIENT_EMAIL, ALLOWED_ORIGINS (comma-separated site origins).
// Execute as the owner, with access for Anyone. No account keys go in the website.
function doPost(e) {
  var payload, result = {type:'park-enquiry-result',success:false,requestId:''};
  var origin = '';
  var lock = LockService.getScriptLock();
  try {
    payload = JSON.parse(e.parameter.payload || '{}');
    result.requestId = String(payload.requestId || '');
    var settings = PropertiesService.getScriptProperties();
    var allowed = (settings.getProperty('ALLOWED_ORIGINS') || '').split(',').map(function(value){return value.trim();});
    origin = String(payload.origin || '');
    if (allowed.indexOf(origin) === -1) throw new Error('This website is not configured for enquiries.');
    if (!/^[a-zA-Z0-9-]{20,80}$/.test(result.requestId)) throw new Error('Invalid request.');
    var name = String(payload.name || '').trim();
    var email = String(payload.email || '').trim();
    var phone = String(payload.phone || '').trim();
    var message = String(payload.message || '').trim();
    var product = String(payload.product || '').trim();
    if (payload.website || name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 30 || message.length > 12000 || !message || product.length > 150) throw new Error('Please check your contact details and try again.');
    var sheetId = settings.getProperty('SHEET_ID');
    var recipient = settings.getProperty('RECIPIENT_EMAIL');
    if (!sheetId || !recipient) throw new Error('Enquiry service setup is incomplete.');
    lock.waitLock(20000);
    var book = SpreadsheetApp.openById(sheetId);
    var sheet = book.getSheetByName('Enquiries') || book.insertSheet('Enquiries');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Request ID','Received at','Name','Mobile','Email','Product','Query','Page origin','Email status']);
      sheet.setFrozenRows(1);
    }
    var match = sheet.getLastRow() > 1 ? sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(result.requestId).matchEntireCell(true).findNext() : null;
    var row;
    if (match) {
      row = match.getRow();
      if (sheet.getRange(row,9).getValue() === 'Sent') {result.success=true;return enquiryReply_(result,origin);}
      // Retry the email from the saved row; never append a duplicate enquiry.
      var saved=sheet.getRange(row,3,1,5).getValues()[0];
      name=String(saved[0]);phone=String(saved[1]);email=String(saved[2]);product=String(saved[3]);message=String(saved[4]);
    } else {
      sheet.appendRow([result.requestId,new Date(),safeCell_(name),safeCell_(phone),safeCell_(email),safeCell_(product),safeCell_(message),origin,'Pending']);
      row=sheet.getLastRow();
    }
    try {
      MailApp.sendEmail({to:recipient,replyTo:email,subject:'PARK enquiry'+(product ? ': '+product : ''),body:'Name: '+name+'\nMobile: '+phone+'\nEmail: '+email+'\nProduct: '+(product||'Not specified')+'\n\n'+message});
      sheet.getRange(row,9).setValue('Sent');
    } catch (error) {
      sheet.getRange(row,9).setValue('Failed');
      throw new Error('Your details were saved, but the email could not be sent. Please retry.');
    }
    result.success=true;
  } catch (error) {
    result.message = error.message || 'Unable to submit your enquiry. Please try again.';
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
  return enquiryReply_(result,origin);
}

function safeCell_(value) {return /^[=+\-@]/.test(value) ? "'"+value : value;}
function enquiryReply_(result,origin) {
  var data=JSON.stringify(result).replace(/</g,'\\u003c');
  var target=JSON.stringify(origin).replace(/</g,'\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><html><body><script>window.top.postMessage('+data+','+target+');</script></body></html>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
