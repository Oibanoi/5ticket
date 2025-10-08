"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Ticket, Menu, X } from "lucide-react";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#0d0d0d] text-white relative z-50">
      <div className="flex max-w-7xl items-center justify-between px-3  pr-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.svg" alt="5TICKET" width={100} height={40} className="h-8 w-auto" />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Tìm kiếm sự kiện"
              className="pl-10 bg-[#1a1c20] border-none text-sm text-white placeholder:text-gray-400 rounded-full focus-visible:ring-1 focus-visible:ring-blue-600"
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="link" className="text-sm text-gray-200 hover:text-white">
            Tạo sự kiện
          </Button>

          <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
            <Ticket size={20} />
            <span className="text-sm font-medium">Vé của tôi</span>
          </div>

          <Separator orientation="vertical" className="h-6 bg-gray-700 mx-1" />

          <LanguageSwitcher />

          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
          >
            Đăng nhập
          </Button>
          <Button
            variant="secondary"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-full px-5"
          >
            Đăng ký
          </Button>
        </div>

        {/* Mobile Breadcrumb (Menu button) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 top-full w-full bg-dark-normal border-t border-gray-800 transition-all duration-300 overflow-hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Tìm kiếm sự kiện"
              className="pl-10 bg-[#1a1c20] border-none text-sm text-white placeholder:text-gray-400 rounded-full focus-visible:ring-1 focus-visible:ring-blue-600"
            />
          </div>

          <Button variant="link" className="justify-start text-gray-200 hover:text-white">
            Tạo sự kiện
          </Button>

          <div className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <Ticket size={20} />
            <span className="text-sm font-medium">Vé của tôi</span>
          </div>

          <Separator className="bg-gray-700" />

          <LanguageSwitcher />

          <div className="flex space-x-3 pt-2">
            <Button
              variant="default"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Đăng nhập
            </Button>
            <Button
              variant="secondary"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-full"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
