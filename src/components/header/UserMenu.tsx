"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Ticket, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const UserMenu = () => {
  const { data: session } = useSession();
  const t = useTranslations("Header");

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const userName = user.name || user.email || "User";
  const userAvatar = user.avatar;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center space-x-2 rounded-full hover:bg-white/10 transition-colors p-1 pr-3"
          aria-label="User menu"
        >
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt={userName}
              width={32}
              height={32}
              className="rounded-full w-8 h-8 object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          )}
          <span className="text-sm font-medium hidden md:block max-w-[120px] truncate">
            {userName}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#1a1c20] border-gray-700 text-white">
        <DropdownMenuLabel className="text-gray-400">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-white">{userName}</p>
            {user.email && <p className="text-xs text-gray-400 truncate">{user.email}</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>{t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
          <Ticket className="mr-2 h-4 w-4" />
          <span>{t("my_tickets")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>{t("settings")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="hover:bg-white/10 cursor-pointer text-red-400 focus:text-red-400"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
