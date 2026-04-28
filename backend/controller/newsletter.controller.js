import newsletterModel from "../models/newsletter.model.js";

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    const existingSubscriber = await newsletterModel.findOne({ email });

    if (existingSubscriber) {
      return res.json({
        success: false,
        message: "Email already subscribed",
      });
    }

    await newsletterModel.create({ email });

    res.json({
      success: true,
      message: "Successfully subscribed",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await newsletterModel.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { subscribeNewsletter, getSubscribers };
