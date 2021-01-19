import sgMail from "@sendgrid/mail"

sgMail.setApiKey("SG."+process.env.SENDGRID_KEY)

function sendEmailHandler({
     functionName,
     emailDatas
}) {

     const emailTypes = {
          sendEmailForValidation: async () => {
               const emailProps = {
                    to: emailDatas.email,
                    from: `iHairSLS <${process.env.EMAIL_IHAIR}>`,
                    templateId: process.env["EMAIL_CONFIRMATION_TEMPLATE_ID"],
                    dynamic_template_data: {
                         dynamicLink: `http://localhost:7070/verify-email?emailToken=${emailDatas.emailToken}&email=${emailDatas.email}`,
                         userName: emailDatas.name.includes(" ") ?
                              emailDatas.name.substring(0, emailDatas.name.indexOf(" ")) :
                              emailDatas.name,
                    }
               }
               sgMail.send(emailProps)
          }
     }

     emailTypes[functionName]()
}

export default sendEmailHandler;