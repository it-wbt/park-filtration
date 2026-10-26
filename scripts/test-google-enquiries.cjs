const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const rows = [];
let emails = 0;
const sheet = {
  getLastRow: () => rows.length,
  appendRow: row => rows.push(row),
  setFrozenRows: () => {},
  getRange: (row, col, count, width) => ({
    getValue: () => rows[row-1][col-1],
    setValue: value => {rows[row-1][col-1] = value;},
    getValues: () => [rows[row-1].slice(col-1, col-1+width)],
    createTextFinder: id => ({matchEntireCell: () => ({findNext: () => {
      const index = rows.findIndex(saved => saved[0] === id);
      return index < 0 ? null : {getRow: () => index+1};
    }})}),
  }),
};
const settings = {SHEET_ID:'sheet',ALLOWED_ORIGINS:'http://localhost:3000'};
const sandbox = {
  PropertiesService:{getScriptProperties:()=>({getProperty:key=>settings[key]})},
  LockService:{getScriptLock:()=>({waitLock:()=>{},hasLock:()=>true,releaseLock:()=>{}})},
  SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet})},
  MailApp:{sendEmail:()=>{emails++;}},
  HtmlService:{XFrameOptionsMode:{ALLOWALL:'all'},createHtmlOutput:html=>({html,setXFrameOptionsMode:()=>html})},
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('integrations/google-enquiries/Code.gs','utf8'),sandbox);
const payload = {requestId:'12345678-1234-1234-1234-123456789012',origin:'http://localhost:3000',website:'localhost',requirement:'Need a HEPA filter for a cleanroom',name:'Test customer',email:'test@example.com',phone:'7496961240',message:'Need a filter'};
const submit = changes => sandbox.doPost({parameter:{payload:JSON.stringify({...payload,...changes})}});
assert.match(submit(), /"success":true/);
assert.equal(rows.length,2);assert.equal(emails,0);assert.equal(rows[1][7],'localhost');assert.equal(rows[1][8],'http://localhost:3000');assert.equal(rows[1][9],'Saved');assert.equal(rows[1][10],'Need a HEPA filter for a cleanroom');
assert.match(submit(), /"success":true/);
assert.equal(rows.length,2);assert.equal(emails,0);
const retryId = 'abcdefgh-1234-1234-1234-123456789012';
assert.match(submit({requestId:retryId,message:'=unsafe formula'}), /"success":true/);
assert.equal(rows.length,3);assert.equal(rows[2][9],'Saved');assert.equal(rows[2][6],"'=unsafe formula");
assert.match(submit({requestId:retryId}), /"success":true/);
assert.equal(rows.length,3);assert.equal(emails,0);assert.equal(rows[2][9],'Saved');
assert.match(submit({origin:'https://unconfigured.example'}), /"success":false/);
assert.match(submit({email:'invalid'}), /"success":false/);
assert.match(submit({requestId:'zzzzzzzz-1234-1234-1234-123456789012',email:'bad'}), /"success":false/);
assert.equal(rows.length,3);assert.equal(emails,0);
console.log('Google enquiry tests passed: sheet-only save, requirement column, duplicate protection, formula safety and validation.');
