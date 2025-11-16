"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";

import { cn } from "../../lib/utils";
import { getAccessToken, clearTokens } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    // Protect route
    if (!getAccessToken()) {
      router.push("/");
    }
  }, []);

  if (!ready) return null;

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 text-white" />,
    },
    {
      label: "Profile",
      href: "/profile", 
      icon: <IconUserBolt className="h-5 w-5 text-white" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 text-white" />,
    },

    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 text-white" />,
      onClick: () => {
        if (confirm("Are you sure you want to logout?")) {
          clearTokens();
          router.push("/");
        }
      },
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden bg-black md:flex-row",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-black text-white border-r border-neutral-800">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-3">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="text-white" />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1 p-4 overflow-y-auto text-white bg-neutral-900">
        {children}
      </div>
    </div>
  );
}

export const Logo = () => (
  <a className="flex items-center gap-2 py-1 text-white" href="#">
    <div className="h-5 w-6 bg-white rounded" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
      Task Manager
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a className="flex items-center py-1" href="#">
    <div className="h-5 w-6 bg-white rounded" />
  </a>
);
