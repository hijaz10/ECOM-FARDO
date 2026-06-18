import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import axios from "axios";
import productModel from "../models/product.models.js";
import transporter from "../config/nodemailer.js";
import { error } from "console";

const formatNGN = (amount) =>
  `₦${Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
// EMAIL HELPER
const sendOrderConfirmationEmail = async (order, address) => {
  try {
    const itemsHTML = order.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0f0;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #12124a;">${item.name}</p>
                ${item.shade ? `<p style="margin: 4px 0 0; font-size: 12px; color: #6c5ce7;">Shade: ${item.shade}</p>` : ""}
                <p style="margin: 4px 0 0; font-size: 12px; color: #4a4a6a;">Qty: ${item.quantity}</p>
              </div>
            </div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e0e0f0; text-align: right; font-size: 14px; font-weight: 600; color: #12124a;">
            ${formatNGN(item.price * item.quantity)}
          </td>
        </tr>
      `,
      )
      .join("");

    await transporter.sendMail({
      from: `"Fardo Beauty" <${process.env.EMAIL_USER}>`,
      to: address.email,
      subject: `Order Confirmed — Fardo Beauty`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 0; background: #ffffff;">

          <!-- HEADER -->
          <div style="background: #12124a; padding: 32px 40px; text-align: center;">
            <h1 style="font-size: 28px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: -1px;">
              FARDO<span style="color: #6c5ce7;">.</span>
            </h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 6px 0 0;">
              Premium Cosmetics
            </p>
          </div>

          <!-- SUCCESS BANNER -->
          <div style="background: #6c5ce7; padding: 24px 40px; text-align: center;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: rgba(255,255,255,0.7);">
              Order Confirmed
            </p>
            <h2 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">
              Thank you, ${address.firstName}!
            </h2>
          </div>

          <!-- BODY -->
          <div style="padding: 40px;">

            <p style="font-size: 14px; color: #4a4a6a; line-height: 1.7; margin: 0 0 32px;">
              Your payment was successful and your order is now being processed. 
              Our team will reach out to you regarding the delivery fee and timeline 
              based on your location.
            </p>

            <!-- ORDER SUMMARY -->
            <div style="margin-bottom: 32px;">
              <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #12124a; margin: 0 0 16px;">
                Order Summary
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  ${itemsHTML}
                </tbody>
                <tfoot>                  
                  <tr>
                    <td style="padding: 16px 0 4px; font-size: 13px; color: #4a4a6a;">Subtotal</td>
                    <td style="padding: 16px 0 4px; text-align: right; font-size: 13px; color: #4a4a6a;">${formatNGN(order.amount)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 13px; color: #4a4a6a;">Delivery Fee</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 13px; color: #6c5ce7; font-weight: 600;">Pay on Delivery</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0 0; font-size: 15px; font-weight: 700; color: #12124a; border-top: 2px solid #e0e0f0;">Total Paid</td>
                    <td style="padding: 12px 0 0; text-align: right; font-size: 15px; font-weight: 700; color: #6c5ce7; border-top: 2px solid #e0e0f0;">${formatNGN(order.amount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- DELIVERY ADDRESS -->
            <div style="background: #f8f7ff; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
              <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #12124a; margin: 0 0 12px;">
                Delivery Address
              </p>
              <p style="font-size: 13px; color: #4a4a6a; margin: 0; line-height: 1.8;">
                ${address.firstName} ${address.lastName}<br/>
                ${address.street}<br/>
                ${address.city}, ${address.state} ${address.zip}<br/>
                ${address.country}<br/>
                ${address.phone}
              </p>
            </div>

            <!-- DELIVERY NOTICE -->
            <div style="border-left: 3px solid #6c5ce7; padding: 12px 16px; background: #f0effe; margin-bottom: 32px;">
              <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #12124a; margin: 0 0 6px;">
                Delivery Notice
              </p>
              <p style="font-size: 12px; color: #4a4a6a; margin: 0; line-height: 1.6;">
                Our delivery team will contact you shortly with the delivery fee 
                for your location. The delivery fee will be paid when your order arrives.
              </p>
            </div>

            <p style="font-size: 13px; color: #4a4a6a; line-height: 1.7; margin: 0 0 8px;">
              Need help? Contact us at 
              <a href="mailto:support@fardocosmetics.com" style="color: #6c5ce7; text-decoration: none;">
                support@fardocosmetics.com
              </a> 
              or WhatsApp 
              <a href="https://wa.me/2347070890004" style="color: #6c5ce7; text-decoration: none;">
                +234 707 089 0004
              </a>
            </p>
          </div>

          <!-- FOOTER -->
          <div style="background: #f8f7ff; padding: 24px 40px; text-align: center; border-top: 1px solid #e0e0f0;">
            <p style="font-size: 11px; color: #4a4a6a; margin: 0; letter-spacing: 1px;">
              © ${new Date().getFullYear()} Fardo Cosmetics. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    // don't fail the order if email fails
    console.error("Order confirmation email failed:", error);
  }
};

// PLACE ORDER - COD
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// PLACE ORDER WITH PAYSTACK
const placeOrderPaystack = async (req, res) => {
  try {
    const { items, amount, address, reference } = req.body;

    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Paystack",
      payment: false,
      paystackReference: reference,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const paystackAmount = amount * 100;

    res.json({
      success: true,
      orderId: newOrder._id,
      amount: paystackAmount,
      reference,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// VERIFY PAYSTACK PAYMENT
const verifyPaystack = async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    if (!reference || !orderId) {
      return res.json({
        success: false,
        message: "Payment reference is missing",
      });
    }

    const existingOrder = await orderModel.findById(orderId);
    if (!existingOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (existingOrder.payment === true) {
      return res.json({ success: true, message: "Order already verified" });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      },
    );

    const data = response.data.data;
    console.log("PAYSTACK VERIFY DATA:", JSON.stringify(data, null, 2));

    if (data.status !== "success") {
      return res.json({ success: false, message: "Payment not successful" });
    }
    if (data.amount !== existingOrder.amount * 100) {
      return res.json({ success: false, message: "Payment amount mismatch" });
    }
    if (data.currency !== "NGN") {
      return res.json({ success: false, message: "Invalid currency" });
    }

    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    await userModel.findByIdAndUpdate(existingOrder.userId, { cartData: {} });

    if (!existingOrder.confirmationEmailSent) {
      await sendOrderConfirmationEmail(existingOrder, existingOrder.address);
      await orderModel.findByIdAndUpdate(orderId, {
        confirmationEmailSent: true,
      });
    }

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Payment verification failed. Please contact support.",
    });
  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({
      userId,
      payment: true,
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET ALL ORDERS - ADMIN
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 }).lean();
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE ORDER STATUS - ADMIN
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderPaystack,
  verifyPaystack,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
