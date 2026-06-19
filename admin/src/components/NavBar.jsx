import React from "react";

function NavBar({ setToken }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-100 flex items-center justify-between px-4 h-16 border-b border-border bg-background/90 backdrop-blur-md">
      <p className="text-2xl font-bold tracking-tight text-foreground">
        Fardo<span className="text-muted-foreground">.</span>
        <span className="text-muted-foreground/70 ml-2 mr-6 text-sm">
          Admin
        </span>
      </p>

      <button
        onClick={() => setToken("")}
        className="
          bg-primary text-primary-foreground
          px-5 py-2 rounded-full
          text-sm font-semibold uppercase tracking-widest

          transition-all duration-300

          hover:bg-primary/90
          hover:-translate-y-0.5
          hover:shadow-lg

          active:scale-95
        "
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
