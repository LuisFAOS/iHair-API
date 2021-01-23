import ratingSchema from "./schemas/rating.schema.js";


async function ratingValidationHandler(numericRatings, comment) {
    try {
        await ratingSchema.validate({general: numericRatings.general, comment})
        
        Object.values(numericRatings).forEach(async numericRating => {
            await ratingSchema.validate({general: numericRatings.general, numericRating})
        })
    } catch (error) {
        return error.message
    }
}

export default ratingValidationHandler