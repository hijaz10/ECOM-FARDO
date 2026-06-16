import orderModel from "../models/order.model.js";

const getPaymentHistory = async (req, res) => {
  try {
    const payments = await orderModel.find({}).sort({ date: -1 }).lean();

    const formatted = payments.map((order) => ({
      _id: order._id,
      userId: order.userId,
      items: order.items,
      amount: order.amount,
      paymentMethod: order.paymentMethod,
      payment: order.payment,
      status: order.status,
      date: order.date,
      address: order.address,
      paystackReference: order.paystackReference || "",
    }));

    const totalPaid = payments
      .filter((o) => o.payment)
      .reduce((sum, o) => sum + o.amount, 0);
    const totalPending = payments
      .filter((o) => !o.payment)
      .reduce((sum, o) => sum + o.amount, 0);

    res.json({
      success: true,
      payments: formatted,
      summary: {
        totalPaid,
        totalPending,
        paidCount: payments.filter((o) => o.payment).length,
        pendingCount: payments.filter((o) => !o.payment).length,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { getPaymentHistory };
