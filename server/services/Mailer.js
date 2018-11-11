// const sgMail = require('@sendgrid/mail');
// const keys = require("../config/keys");
 
// class Mailer {
//   constructor({subject, recipients}, content){
//     this.message = { 
//       to: recipients,
//       from: 'no-reply@osurvey.com',
//       subject: subject,
//       html: content,
//       trackingSettings: {
//         clickTracking: { enable: true }
//       }
//     };
//     sgMail.setApiKey(keys.sendGridKey);
//   }
// // sendMultiple ensures individual emails are sent to each recipient separately, 
// // so no one is able to see the other addresses the email was sent to. 
//   async send() {
//     const response = await sgMail.sendMultiple(this.message);
//     return response;
//   }
// }
 
// module.exports = Mailer;

const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor( { subject, recipients }, content ) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();

  }

  formatAddresses(recipients) {
    return recipients.map( ({email}) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    console.log('hello~send');
    // try {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    console.log('response is not working properly')
    const response = await this.sgApi.API(request);
    console.log(response,'finally succes!!')
    return response;
  // } catch (err) {
  //   console.log(err.response.body.errors);
  //   console.log("any ideas?")
  // }
  }
}

module.exports = Mailer;