'use client';

import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu"; // Ensure correct import
import { cn } from "../app/utils/cn"; // Ensure this utility is defined
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <Link href={"/"} >
                    <MenuItem setActive={setActive} active={active} item="Home" />
                </Link>
                <Link href={"/pages/dashboard"} >
                    <MenuItem setActive={setActive} active={active} item="Dashboard" />
                </Link>
                <Link href="/pages/chatbot" >
                    <MenuItem setActive={setActive} active={active} item="Financial Advisor" />
                </Link>
            </Menu>
        </div>
    );
}

export default Navbar;
