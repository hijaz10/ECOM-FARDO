import { useEffect, useState } from "react";

function TermsBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("fardo_terms_accepted");

    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("fardo_terms_accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-slideUp">
      <div className="bg-[var(--color-background)] border-t border-[var(--color-border)] shadow-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* text */}
        <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          By using this site, you agree to our{" "}
          <a
            href="/terms"
            target="_blank"
            className="text-[var(--color-primary)] underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-[var(--color-primary)] underline"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* button */}
        <button
          onClick={acceptTerms}
          className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default TermsBanner;
