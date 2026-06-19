import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">
        404 — Page Not Found
      </p>

      <h1
        className="font-serif text-[8rem] sm:text-[12rem] leading-none font-bold text-foreground select-none"
        style={{ opacity: 0.08 }}
      >
        404
      </h1>

      <div className="mt-[-2rem] mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          This page doesn't exist
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          The link may be broken, or the page may have been removed.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="border border-border px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:border-foreground transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-foreground text-background px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
