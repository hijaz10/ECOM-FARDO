import React, { useState } from "react";
import { motion } from "framer-motion";
import Title from "../components/Title";
import { Phone, Mail, MapPin, MessageCircle, HelpCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "../utils/toast";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};

    if (!formData.name) errs.name = "Name required";
    if (!formData.email) errs.email = "Email required";
    if (!formData.message) errs.message = "Message required";

    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    emailjs
      .send(
        "service_ptlu8sw",
        "template_28hz9wp",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "8xlMuQDmI648wHE6q",
      )
      .then(() => {
        toast.success("Message sent successfully");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("Failed to send message");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="pt-16 pb-24 bg-background text-foreground">
      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row max-w-5xl mx-auto border border-border shadow-xl overflow-hidden "
      >
        {/* FORM */}
        <div className="flex-1 p-8 md:p-10 bg-background">
          <h2 className="text-lg font-medium mb-6 uppercase tracking-widest">
            Send Message
          </h2>

          <p className="text-xs text-muted-foreground mb-6">
            Feel free to contact us any time. We will get back to you as soon as
            we can!
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border-b border-border bg-transparent py-2 text-sm outline-none"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-b border-border bg-transparent py-2 text-sm outline-none"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="border-b border-border bg-transparent py-2 text-sm outline-none resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.3em] hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="w-full md:w-[320px] bg-secondary text-secondary-foreground p-8">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 opacity-70">
            Contact Info
          </p>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-3 items-center">
              <MapPin size={20} />
              <p>Abuja, Nigeria</p>
            </div>

            <div className="flex gap-3 items-center">
              <Phone size={20} />
              <p>+234 707 089 0004</p>
            </div>

            <div className="flex gap-3 items-center">
              <Mail size={20} />
              <p>Support@fardocosmetics.com</p>
            </div>

            <a
              href="https://wa.me/+2347070890004"
              className="text-primary underline text-xs mt-4"
            >
              <div className="flex gap-3 items-center">
                <MessageCircle />
                <p>Chat on WhatsApp</p>
              </div>
            </a>

            <Link to={"/faqs"} className="text-primary underline text-xs mt-4">
              <div className="flex gap-3 items-center">
                <HelpCircle />
                <p>FAQS</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
