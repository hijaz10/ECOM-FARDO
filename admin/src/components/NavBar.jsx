import React from "react";

function NavBar({ setToken }) {
  return (
    <nav className="flex items-center justify-between px-4 h-16 border-b border-border bg-background">
      <p className="text-2xl font-bold tracking-tight text-foreground">
        Fardo<span className="text-muted-foreground">.</span>
        <span className="text-sm font-normal text-muted-foreground ml-2">
          Admin
        </span>
      </p>
      <button
        onClick={() => setToken("")}
        className="bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
