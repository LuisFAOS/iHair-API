import sgMail from "@sendgrid/mail"
import iEmailData from "../../globalInterfaces/emailData"
import logger from "../../libs/pino"

sgMail.setApiKey("SG."+process.env.SENDGRID_KEY)

function handleSendEmail(emailData: iEmailData) {

    const {
        emailAddress, 
        templateID = "EMAIL_CONFIRMATION_TEMPLATE_ID",
        dynamic_template_data
    } = emailData

    
    const dynamic_template_data_formater = {
        "EMAIL_CONFIRMATION_TEMPLATE_ID": () => {
            let { dynamicLink, userName} = dynamic_template_data
            dynamicLink = 'http://localhost:7070/'+dynamicLink
            return {
                dynamicLink,
                userName: userName.includes(" ") ?
                    userName.substring(0, userName.indexOf(" ")) :
                    userName,
            }
        },
        "SEND_VERIFICATION_CODE_ID": () => {
            const { verification_code } = dynamic_template_data
            return {
                verification_code
            }
        }
    }

    const emailProps = {
        to: emailAddress,
        from: `iHairSLS <${process.env.EMAIL_IHAIR}>`,
        templateId: process.env[templateID],
        dynamic_template_data: dynamic_template_data_formater[templateID]()
    }

    logger.info(`Sending email to ${emailAddress}`)
    sgMail.send(emailProps)
}

export default handleSendEmail;
