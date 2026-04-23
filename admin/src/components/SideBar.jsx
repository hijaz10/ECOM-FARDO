import React from "react";
import { NavLink } from "react-router-dom";
import { PlusCircle, List, ClipboardList } from "lucide-react";

function SideBar() {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-md border text-sm font-medium transition-all";

  return (
    <div className="w-64 min-h-screen border-r border-border bg-background p-4 flex flex-col">
      {/* LOGO */}

      {/* NAV LINKS */}
      <div className="flex flex-col gap-3 pt-8">
        {/* ADD ITEMS */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-secondary border-primary text-primary"
                : "border-border text-foreground hover:bg-muted"
            }`
          }
        >
          <PlusCircle size={18} />
          Add Items
        </NavLink>

        {/* LIST ITEMS */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-secondary border-primary text-primary"
                : "border-border text-foreground hover:bg-muted"
            }`
          }
        >
          <List size={18} />
          List Items
        </NavLink>

        {/* ORDERS */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-secondary border-primary text-primary"
                : "border-border text-foreground hover:bg-muted"
            }`
          }
        >
          <ClipboardList size={18} />
          Orders
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
