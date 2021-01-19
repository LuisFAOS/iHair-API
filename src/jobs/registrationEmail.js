import sendEmail from "../libs/emailSendgrid/emailSender.js";

export default {
     key: 'RegistrationEmail',
     options: {
          attemps: 3,
     },
     async handle({
          data
     }) {
          const {
               emailProps
          } = data
          sendEmail(emailProps)
     }
}