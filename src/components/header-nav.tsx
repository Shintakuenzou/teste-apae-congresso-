import { Link } from "@tanstack/react-router";
import { navItems } from "@/constants/navigation";

export function HeaderNav() {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        return (
          <Link
            key={item.to}
            to={item.to}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-white"
            activeProps={{
              className: "bg-white/20 font-bold",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
