import React from "react";
import Title from "../components/Title";

const sections = [
  {
    title: "Information We Collect",
    content: `When you create an account or place an order on Fardo, we collect personal information including your name, email address, phone number, and delivery address. We also collect payment related information processed securely through Paystack. When you browse our website, we may collect technical data such as your IP address, browser type, and pages visited to help us improve your experience.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to process and fulfil your orders, send order confirmations and delivery updates, respond to your enquiries, and improve our products and services. With your consent, we may also send you newsletters about new arrivals and exclusive offers. We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: "Payment Security",
    content: `All payments on Fardo are processed through Paystack, a PCI-DSS compliant payment gateway. We do not store your card details on our servers. Your payment information is encrypted and handled entirely by Paystack in accordance with industry security standards.`,
  },
  {
    title: "Cookies",
    content: `We use cookies to keep you signed in, remember your cart, and understand how visitors use our site. You may disable cookies in your browser settings, but this may affect certain features of the website. We do not use cookies for advertising purposes.`,
  },
  {
    title: "Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide you with our services. If you wish to delete your account or request that we no longer use your information, please contact us at support@fardocosmetics.com. We will respond within 7 business days.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications by clicking the unsubscribe link in any email we send you or by contacting us directly. To exercise any of these rights, please reach out to support@fardocosmetics.com.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will revise the date at the bottom of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
];

function PrivacyPolicy() {
  return (
    <div className="pt-14 max-w-3xl mx-auto pb-20">
      <div className="mb-10">
        <Title text1="PRIVACY" text2="POLICY" />
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: January 2025
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-10">
        At Fardo Cosmetics, your privacy is important to us. This policy
        explains what information we collect, how we use it, and how we protect
        it when you shop with us.
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
          Contact Us
        </p>
        <p className="text-sm text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a href="mailto:support@fardocosmetics.com" className="text-primary">
            support@fardocosmetics.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
