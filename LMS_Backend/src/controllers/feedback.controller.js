import Feedback from "../models/feedback.model.js";

const submitFeedback = async (req, res) => {
    try {
        const { email, feedback} = req.body
        if (!email || !feedback) {
            return res.status(400).json({
                success: false,
                message: 'please enter the email and feedback'
            })
        }
        const name = req.user?.name
        const profileImage = req.user?.profileImage

        const saveFeedback = new Feedback({
            name,
            email,
            feedback,
            profileImage
        })

        await saveFeedback.save()
        return res.status(200).json({
            success: true,
            message: 'feedback submitted',
            data: saveFeedback
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Server error: Feedback cannot be submitted',
            error: error
        })
    }
}

const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({createdAt: -1})
        res.status(200).json({
            success: true,
            message: 'Feedback fetched successfully',
            data: feedback
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'server error: Feedback fetching failed',
            error: error
        })
    }
}
export {submitFeedback, getFeedback}