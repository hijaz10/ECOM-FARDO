import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, RotateCcw } from "lucide-react";

const faqSections = [
  {
    id: "orders",
    label: "Orders & Shipping",
    icon: Package,
    questions: [
      {
        q: "When will my order ship?",
        a: "Orders are typically processed within 1 to 2 business days. You will receive a confirmation email with tracking details once your order has been dispatched.",
      },
      {
        q: "How can I track the status of my order?",
        a: "You can track your orders status through the orders page.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 1 hour of being placed. After that window, our fulfilment team will have already begun processing it.",
      },
      {
        q: "Can I make changes to my order?",
        a: "Yes, within 1 hour of placing the order you may contact us to make changes to size, colour, or address. After this we cannot guarantee amendments.",
      },

      {
        q: "Can I ship my order to the hotel/Airbnb I'm staying in?",
        a: "Yes! Simply enter the hotel or Airbnb address at checkout. We recommend notifying the front desk to expect a package in your name.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    icon: RotateCcw,
    questions: [
      {
        q: "My item arrived damaged, what should I do?",
        a: "We're so sorry to hear this. Please contact our support team within 48 hours of delivery with a photo of the damage and your order number, and we'll make it right.",
      },
      {
        q: "I have received the incorrect item, what should I do?",
        a: "Please reach out to our team with your order number and a photo of the item received. We'll arrange a replacement or refund as quickly as possible.",
      },

      {
        q: "How long do I have to return my item?",
        a: "You have 30 days from the date of delivery to initiate a return. Items must be in their original, unworn condition with all tags attached.",
      },

      {
        q: "I have an issue with an item purchased in store, what do I do?",
        a: "For in-store purchase issues, please visit the store directly or contact our customer care team. We'll be happy to help resolve any quality concerns.",
      },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="border-b border-gray-200"
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="text-[11px] sm:text-xs tracking-[0.18em] uppercase font-medium text-gray-800 pr-6 leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          {question}
        </span>
        <span
          className="flex-shrink-0 text-gray-500 text-xl leading-none transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p
              className="text-xs sm:text-[13px] text-gray-500 pb-5 leading-relaxed pr-8"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FaqSection({ section, openItem, onToggle }) {
  const Icon = section.icon;

  return (
    <div className="mb-12 sm:mb-16" id={section.id}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <Icon
          size={15}
          className="text-gray-500 flex-shrink-0"
          strokeWidth={1.5}
        />
        <h2
          className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-gray-700 font-medium"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          {section.label}
        </h2>
      </div>

      {/* Accordion */}
      <div>
        {section.questions.map((item, i) => {
          const key = `${section.id}-${i}`;
          return (
            <AccordionItem
              key={key}
              question={item.q}
              answer={item.a}
              isOpen={openItem === key}
              onToggle={() => onToggle(key)}
              index={i}
            />
          );
        })}
      </div>
    </div>
  );
}

function Faq() {
  const [openItem, setOpenItem] = useState(null);
  const [activeSection, setActiveSection] = useState("orders");

  const handleToggle = (key) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <>
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
      >
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14"
        >
          <h1 className="text-sm sm:text-base tracking-[0.4em] uppercase text-gray-800 font-medium">
            FAQs
          </h1>
        </motion.div>

        {/* Main layout */}
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pb-20 sm:pb-28">
          <div className="flex flex-col md:flex-row gap-0 md:gap-12 lg:gap-16 xl:gap-20">
            {/* FAQ content  */}
            <main className="flex-1 min-w-0">
              {faqSections.map((section) => (
                <FaqSection
                  key={section.id}
                  section={section}
                  openItem={openItem}
                  onToggle={handleToggle}
                />
              ))}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
