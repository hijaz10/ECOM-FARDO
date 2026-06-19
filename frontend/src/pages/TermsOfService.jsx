import React from "react";
import Title from "../components/Title";

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using the Fardo Cosmetics website and placing an order, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website. We reserve the right to update these terms at any time without prior notice.`,
  },
  {
    title: "Products and Pricing",
    content: `All products listed on Fardo are subject to availability. We reserve the right to discontinue any product at any time. Prices are displayed in the currency shown at checkout and are subject to change without notice. We make every effort to ensure prices are accurate, but in the event of a pricing error, we reserve the right to cancel the affected orders and issue a full refund.`,
  },
  {
    title: "Orders and Payment",
    content: `By placing an order, you confirm that all information provided is accurate and that you are authorised to use the payment method selected. Orders are only confirmed once payment has been successfully processed. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud or pricing errors.`,
  },
  {
    title: "Shipping and Delivery",
    content: `We aim to dispatch all orders within 1 to 3 business days. Delivery timelines vary depending on your location and are estimated, not guaranteed. Fardo is not responsible for delays caused by courier services, customs, or circumstances beyond our control. Once your order has been dispatched, a confirmation with tracking information will be sent to your registered email.`,
  },
  {
    title: "Account Responsibility",
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Please notify us immediately at support@fardocosmetics.com if you suspect unauthorised access. We are not liable for any loss or damage arising from your failure to protect your account information.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on the Fardo website —including product images, descriptions, logos, and design, is the property of Fardo Cosmetics and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.`,
  },
  {
    title: "Limitation of Liability",
    content: `Fardo Cosmetics shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability in connection with any order shall not exceed the amount paid for that order. We do not warrant that our website will be uninterrupted, error free, or free of viruses.`,
  },
  {
    title: "Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.`,
  },
];

function TermsOfService() {
  return (
    <div className="pt-14 max-w-3xl mx-auto pb-20">
      <div className="mb-10">
        <Title text1="TERMS OF" text2="SERVICE" />
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: January 2025
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-10">
        Please read these Terms of Service carefully before using the Fardo
        Cosmetics website. These terms govern your use of our platform and your
        purchase of products from us.
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

      <div className="mt-12 p-6 border border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
          Questions?
        </p>
        <p className="text-sm text-muted-foreground">
          For any questions regarding these terms, contact us at{" "}
          <a href="mailto:support@fardocosmetics.com" className="text-primary">
            support@fardocosmetics.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
