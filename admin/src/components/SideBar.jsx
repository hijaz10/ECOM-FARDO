import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CreditCard, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  PlusCircle,
  List,
  ClipboardList,
  Mail,
  DollarSign,
  LayoutDashboard,
  Pencil,
} from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-md border text-sm font-medium transition-all";

  const links = [
    { to: "/", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/add", icon: <PlusCircle size={18} />, label: "Add Items" },
    { to: "/list", icon: <List size={18} />, label: "List Items" },
    { to: "/orders", icon: <ClipboardList size={18} />, label: "Orders" },
    { to: "/payments", icon: <CreditCard size={18} />, label: "Payments" },
    { to: "/newsletter", icon: <Mail size={18} />, label: "Newsletter" },
  ];

  return (
    <>
      <button
        className="
                    md:hidden
                    fixed top-16 left-0
                    z-101

                    p-2.5


                    bg-background/80
                    backdrop-blur-xl

                    border border-border/50

                    shadow-lg

                    transition-all duration-300
                    hover:scale-105
                    hover:bg-background
                    active:scale-95
                  "
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <PanelLeftClose size={20} strokeWidth={1.8} />
        ) : (
          <PanelLeftOpen size={20} strokeWidth={1.8} />
        )}
      </button>

      {/* OVERLAY - mobile only */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-background border-r border-border pt-16
          p-4 flex flex-col z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64 md:min-h-screen md:shrink-0
        `}
      >
        <div className="flex flex-col gap-3 pt-16 md:pt-8">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${
                  isActive
                    ? "bg-secondary border-primary text-primary"
                    : "border-border text-foreground hover:bg-muted"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBar;
