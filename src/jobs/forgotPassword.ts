import sendEmail from "../libs/sendgrid/emailSender";

export default {
     key: '_forgot_password',
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