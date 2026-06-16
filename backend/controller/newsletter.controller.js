import subscriberModel from "../models/subcriber.model.js";
import transporter from "../config/nodemailer.js";

// SUBSCRIBE
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    const exists = await subscriberModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already subscribed" });
    }

    await subscriberModel.create({ email });

    // send welcome email
    await transporter.sendMail({
      from: `"Fardo Beauty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Fardo — You're In! 💄",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 32px; font-weight: 900; color: #12124a; margin: 0 0 8px;">FARDO.</h1>
          <p style="color: #4a4a6a; font-size: 14px; margin: 0 0 32px;">Premium Cosmetics</p>

          <h2 style="font-size: 20px; font-weight: 700; color: #12124a; margin: 0 0 12px;">
            Welcome to the Fardo Family!
          </h2>
          <p style="color: #4a4a6a; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            Thank you for subscribing. You're now part of an exclusive community 
            that gets first access to new arrivals, special offers, and beauty tips.
          </p>

          <div style="background: #6c5ce7; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 32px;">
            <p style="color: white; font-size: 14px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px;">
              Your Welcome Gift
            </p>
            <p style="color: white; font-size: 36px; font-weight: 900; margin: 0;">20% OFF</p>
            <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 8px 0 0;">
              on your first order
            </p>
          </div>

          <p style="color: #4a4a6a; font-size: 12px; margin: 0;">
            You can unsubscribe at any time by contacting us.
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET ALL SUBSCRIBERS - admin
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriberModel
      .find({})
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, subscribers });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// SEND NEWSLETTER - admin
const sendNewsletter = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.json({
        success: false,
        message: "Subject and message are required",
      });
    }

    const subscribers = await subscriberModel.find({});

    if (subscribers.length === 0) {
      return res.json({ success: false, message: "No subscribers found" });
    }

    const emailList = subscribers.map((s) => s.email);

    // send in batches of 50 to avoid rate limits
    const batchSize = 50;
    for (let i = 0; i < emailList.length; i += batchSize) {
      const batch = emailList.slice(i, i + batchSize);
      await transporter.sendMail({
        from: `"Fardo Beauty" <${process.env.EMAIL_USER}>`,
        bcc: batch, // use BCC so emails are private
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 32px; font-weight: 900; color: #12124a; margin: 0 0 8px;">FARDO.</h1>
            <p style="color: #4a4a6a; font-size: 14px; margin: 0 0 32px;">Premium Cosmetics</p>

            <div style="border-top: 3px solid #6c5ce7; padding-top: 24px; margin-bottom: 32px;">
              ${message.replace(/\n/g, "<br/>")}
            </div>

            <div style="border-top: 1px solid #e0e0f0; padding-top: 24px;">
              <p style="color: #4a4a6a; font-size: 12px; margin: 0;">
                You're receiving this because you subscribed to Fardo Beauty updates.
              </p>
            </div>
          </div>
        `,
      });
    }

    res.json({
      success: true,
      message: `Newsletter sent to ${emailList.length} subscribers`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE SUBSCRIBER - admin
const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.body;
    await subscriberModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Subscriber removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { subscribe, getSubscribers, sendNewsletter, deleteSubscriber };
