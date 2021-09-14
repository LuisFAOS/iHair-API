import sendEmail from "../libs/sendgrid/emailSender";

export default {
     key: '_change_email_address',
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