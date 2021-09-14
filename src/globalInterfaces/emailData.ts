
export default interface iEmailData {
    emailAddress: string,
    templateID: string,
    dynamic_template_data?: {
        verification_code?: string,
        emailToken?: string,
        userName?: string,
        dynamicLink?: string,
    },
}

