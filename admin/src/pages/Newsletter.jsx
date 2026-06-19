import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Send, Users } from "lucide-react";

function Newsletter({ token }) {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribers`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setSubscribers(response.data.subscribers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/delete`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendNewsletter = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in subject and message");
      return;
    }

    try {
      setSending(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/send`,
        { subject, message },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        alert(response.data.message);
        setSubject("");
        setMessage("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8">
      <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-foreground">
        Newsletter
      </p>

      {/* STATS */}
      <div className="flex items-center gap-3 border border-border px-6 py-4 w-fit">
        <Users size={20} className="text-primary" />
        <p className="text-sm font-semibold text-foreground">
          {subscribers.length} Subscribers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SEND NEWSLETTER */}
        <div className="border border-border">
          <div className="px-6 py-4 border-b border-border">
            <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Send Newsletter
            </p>
          </div>
          <form onSubmit={sendNewsletter} className="p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Subject
              </p>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                required
                className="border border-border px-4 py-2 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Message
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your newsletter message here..."
                required
                rows={8}
                className="border border-border px-4 py-2 text-sm outline-none w-full bg-background text-foreground placeholder:text-muted-foreground resize-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Will be sent to {subscribers.length} subscribers
              </p>
              <button
                type="submit"
                disabled={sending || subscribers.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest transition-colors ${
                  sending || subscribers.length === 0
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <Send size={14} />
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>

        {/* SUBSCRIBERS LIST */}
        <div className="border border-border">
          <div className="px-6 py-4 border-b border-border">
            <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Subscribers
            </p>
          </div>

          {loading ? (
            <div className="p-6 animate-pulse flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded w-3/4" />
              ))}
            </div>
          ) : subscribers.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm">
              No subscribers yet.
            </div>
          ) : (
            <div className="flex flex-col max-h-96 overflow-y-auto">
              {subscribers.map((sub, i) => (
                <div
                  key={sub._id}
                  className={`flex items-center justify-between px-6 py-3 ${
                    i !== subscribers.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm text-foreground">{sub.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sub.createdAt).toDateString()}
                    </p>
                  </div>
                  <Trash2
                    size={14}
                    className="text-muted-foreground hover:text-red-500 cursor-pointer transition-colors shrink-0"
                    onClick={() => deleteSubscriber(sub._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
