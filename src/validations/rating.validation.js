import salonRatingSchema from "./schemas/salonRating.schema";


async function ratingValidationHandler(numericRatings, comment) {
    try {
        await salonRatingSchema.validate({general: numericRatings.general, comment})
        
        Object.values(numericRatings).forEach(async numericRating => {
            await salonRatingSchema.validate({general: numericRatings.general, numericRating})
        })
    } catch (error) {
        return error.message
    }
}

export default ratingValidationHandler