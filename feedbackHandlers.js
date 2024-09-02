const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    const feedbacks = Feedback.getAll();
    res.json(feedbacks);
};

const createFeedback = (req, res) => {
    const {sender, message, rating} = req.body;
    const newFeedback = Feedback.addOne(sender, message, rating);
    if (newFeedback) {
        res.json(newFeedback);
    } else {
        res.status(500).json({ message: "Failed to add feedback"});
    }
};

const getFeedbackById = (req, res) => {
    const feedbackId = req.params.feedbackId;
    const feedback = Feedback.findById(feedbackId);
    if (feedback) {
        res.json(feedback);
    } else {
        res.status(404).json({ message: "Feedback not found"});
    }
};

const updateFeedback = (req, res) => {
    const feedbackId = req.params.feedbackId;
    const {sender, message, rating} = req.body;
    const updateFeedback = Feedback.updateOneById(feedbackId, {sender, message, rating});

    if (updateFeedback) {
        res.json(updateFeedback);
    } else {
        res.status(404).json({ message: "Feedback not found"});
    }
};

const deleteFeedback = (req, res) => {
    const feedbackId = req.params.feedbackId;
    const isDeleted = Feedback.deleteOneById(feedbackId);

    if (isDeleted) {
        res.json({message: "Feedback deleted"});
    } else {
        res.status(404).json({ message: "Feedback not found"});
    }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};