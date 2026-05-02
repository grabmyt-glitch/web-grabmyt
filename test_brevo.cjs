const brevo = require("@getbrevo/brevo");
const client = new brevo.BrevoClient({ apiKey: 'test' });
console.log('client keys:', Object.keys(client));
console.log('transactionalEmails:', client.transactionalEmails ? Object.keys(client.transactionalEmails) : 'undefined');
