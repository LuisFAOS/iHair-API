import sendEmail from "../libs/sendgrid/emailSender";

export default {
     key: '_registration_mail',
     options: {
          attemps: 3,
     },
     handle({
          data
     }) {
          const {
               emailProps
          } = data
          sendEmail(emailProps)
     }
}