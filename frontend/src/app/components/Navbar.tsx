// /frontend/src/app/components/Navbar.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Activity,
  GitBranch,
  Settings,
  AlertCircle,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    {
      href: "/monitoring",
      label: "Monitoring",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      href: "/states",
      label: "States",
      icon: <GitBranch className="w-5 h-5" />,
    },
    {
      href: "/status",
      label: "Status",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Bio-AI
              </span>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ href, label, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium 
                      ${
                        isActive
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                  >
                    {icon}
                    <span className="ml-2">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
