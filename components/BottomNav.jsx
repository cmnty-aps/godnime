"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiHome5Line,
  RiHome5Fill,
  RiCalendarEventLine,
  RiCalendarEventFill,
  RiMovie2Line,
  RiMovie2Fill,
  RiHistoryLine,
  RiHistoryFill,
  RiLineChartLine,
  RiLineChartFill,
} from "react-icons/ri";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      isActive: pathname === "/",
      ActiveIcon: RiHome5Fill,
      InactiveIcon: RiHome5Line,
    },
    {
      label: "Jadwal",
      href: "/schedule",
      isActive: pathname.startsWith("/schedule"),
      ActiveIcon: RiCalendarEventFill,
      InactiveIcon: RiCalendarEventLine,
    },
    {
      label: "Katalog",
      href: "/catalog",
      isActive: pathname.startsWith("/catalog") && !pathname.includes("TRENDING_DESC"),
      ActiveIcon: RiMovie2Fill,
      InactiveIcon: RiMovie2Line,
    },
    {
      label: "Riwayat",
      href: "/continue-watching",
      isActive: pathname.startsWith("/continue-watching"),
      ActiveIcon: RiHistoryFill,
      InactiveIcon: RiHistoryLine,
    },
    {
      label: "Trending",
      href: "/catalog?sort=TRENDING_DESC",
      isActive: pathname.includes("TRENDING_DESC"),
      ActiveIcon: RiLineChartFill,
      InactiveIcon: RiLineChartLine,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 min-[990px]:hidden bg-[#0d1017] border-t border-[#1c2230] px-2 pt-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const active = item.isActive;
          const Icon = active ? item.ActiveIcon : item.InactiveIcon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 select-none transition-all duration-150 ${
                active ? "text-white" : "text-[#7f8798] hover:text-white"
              }`}
            >
              <div
                className={`flex items-center justify-center px-4 py-1 rounded-2xl transition-all ${
                  active ? "bg-[#293246]" : "bg-transparent"
                }`}
              >
                <Icon className="text-xl" />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  active ? "text-white font-bold" : "text-[#7f8798]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
