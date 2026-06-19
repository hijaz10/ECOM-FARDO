import React from "react";
import Title from "../components/Title";

const sections = [
  {
    title: "Our Return Window",
    content: `We accept returns within 14 days of delivery. To be eligible for a return, your item must be unused, unopened, and in its original packaging. Due to hygiene reasons, we are unable to accept returns on products that have been opened or used unless the product is faulty or damaged on arrival.`,
  },
  {
    title: "Non-Returnable Items",
    content: `The following items cannot be returned: opened or used cosmetics, items purchased during final sale or clearance events, and gift cards. If you received a product as a gift, the original purchaser must initiate the return.`,
  },
  {
    title: "Damaged or Faulty Products",
    content: `If you receive a product that is damaged, defective, or incorrect, please contact us within 48 hours of delivery at support@fardocosmetics.com with your order number and clear photos of the issue. We will arrange a replacement or full refund at no cost to you.`,
  },
  {
    title: "How to Initiate a Return",
    content: `To start a return, email us at support@fardocosmetics.com with your order number and reason for return. Once approved, we will provide instructions on how and where to send the item. Items sent back without prior approval will not be accepted. You are responsible for return shipping costs unless the item is faulty.`,
  },
  {
    title: "Refunds",
    content: `Once we receive and inspect your return, we will notify you of the approval status. Approved refunds are processed within 5–7 business days back to your original payment method. If you paid via Paystack, the refund will be credited to your original card or bank account. Please note that your bank may take additional time to post the refund.`,
  },
  {
    title: "Exchanges",
    content: `We currently do not offer direct exchanges. If you wish to exchange a product, please return the original item for a refund and place a new order for the item you want. This ensures you receive your preferred product as quickly as possible.`,
  },
  {
    title: "Cash on Delivery Orders",
    content: `For orders paid via Cash on Delivery, approved refunds will be processed as a bank transfer to the account details you provide. Please allow 5–10 business days for COD refunds to be completed.`,
  },
  {
    title: "Contact for Returns",
    content: `If you have any questions about our return process, our team is happy to help. Reach us at support@fardocosmetics.com or via WhatsApp at +234 707 089 0004. We aim to respond to all return enquiries within 24 hours on business days.`,
  },
];

function ReturnPolicy() {
  return (
    <div className="pt-14 max-w-3xl mx-auto pb-20">
      <div className="mb-10">
        <Title text1="RETURN" text2="POLICY" />
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: January 2025
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-10">
        Your satisfaction is our priority. If you are not completely happy with
        your Fardo purchase, here is everything you need to know about our
        return and refund process.
      </p>

      <div className="flex flex-col gap-8">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-primary">0{i + 1}</span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                {section.title}
              </h2>
            </div>
            <div className="pl-7 border-l border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK SUMMARY BOX */}
      <div className="mt-12 border border-border">
        <div className="px-6 py-4 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Quick Summary
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            { label: "Return Window", value: "14 days" },
            { label: "Refund Timeline", value: "5–7 business days" },
            { label: "Condition", value: "Unopened & unused" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-6 border border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
          Need Help?
        </p>
        <p className="text-sm text-muted-foreground">
          Contact us at{" "}
          <a href="mailto:support@fardocosmetics.com" className="text-primary">
            support@fardocosmetics.com
          </a>{" "}
          or WhatsApp{" "}
          <a href="https://wa.me/2347070890004" className="text-primary">
            +234 707 089 0004
          </a>
        </p>
      </div>
    </div>
  );
}

export default ReturnPolicy;
