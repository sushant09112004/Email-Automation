"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        {/* The Navbar will show on top of the page */}
      </p>
    </div>
  );
}

function Navbar({
  className
}) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="flex flex-col space-y-4 text-sm p-4">
            <p className="text-neutral-700 dark:text-neutral-200 text-center">Coming Soon</p>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Services AI">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Generate with AI"
              href="/ai"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Generate proffesional email drafts using AI" />
            <ProductItem
              title="Email"
              href="/email"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Generate professional email drafts using previous templates" />
          
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm p-4">
            <p className="text-neutral-700 dark:text-neutral-200 text-center">Coming Soon</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
