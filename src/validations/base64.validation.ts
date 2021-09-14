import base64Schema from "./schemas/base64.schema"

async function base64ValidationHandler(imgInBase64) {
    try {
        const matchesBlobImg = imgInBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        await base64Schema.validate({imgInBase64:matchesBlobImg[2]})
    } catch (error) {
        return error.message
    }
}

export default base64ValidationHandler