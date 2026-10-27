export function formatEnquiryContext(source: 'Chatbot' | 'Contact form', subject: string, brief: string): string {
  return [
    'Website: PARK FILTRATION',
    'Business: Filtration',
    `Website URL: ${location.origin}/`,
    `Page URL: ${location.href}`,
    `Enquiry source: ${source}`,
    `Subject: [PARK FILTRATION] ${subject}`,
    `brief: ${brief.trim() || 'Not provided'}`,
  ].join('\n');
}
