"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/context/addToCard";
import { useWishlist } from "@/context/favorite";

import Header from "./header";

import {
  ChevronDown,
  Menu,
  UserCircle,
  HelpCircle,
  ShoppingCart,
  Search,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/misc/themeToggler";
import { Card } from "@/components/ui/card";

// ---------------- Menu Components ----------------

function MenuList({ children, className }: any) {
  return (
    <ul className={`shadow-xl rounded-xl p-2 border ${className}`}>
      {children}
    </ul>
  );
}

function MenuItem({ children, onClick }: any) {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-800 px-3 py-2 rounded-lg transition-all"
    >
      {children}
    </li>
  );
}

// ---------------- Profile Menu ----------------

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  // If NOT logged in
  if (!session) {
    return (
      <Link href="/login">
        <Button className="rounded-full bg-orange-600 hover:bg-orange-700 text-white px-5">
          Login
        </Button>
      </Link>
    );
  }

  // Logged in user
  const firstLetter =
    session?.user?.name?.charAt(0)?.toUpperCase() ?? "A";

  return (
    <div className="relative">
      <Button
        className="flex items-center gap-2 rounded-full px-3 py-1 bg-orange-500 text-white hover:bg-orange-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold">{firstLetter}</span>

        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <MenuList className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 z-50 border border-orange-100 dark:border-zinc-800">
          
          <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <p className="font-semibold text-sm">
              {session.user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {session.user?.email}
            </p>
          </div>

          <MenuItem>
            <Link
              href="/profile"
              className="flex items-center gap-2 w-full"
            >
              <UserCircle className="h-4 w-4 text-orange-500" />
              <span>My Profile</span>
            </Link>
          </MenuItem>

          <div className="border-t border-zinc-200 dark:border-zinc-800 mt-2 pt-2">
            <MenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
              <div className="flex items-center gap-2 text-red-500">
                <UserCircle className="h-4 w-4" />
                <span>Sign Out</span>
              </div>
            </MenuItem>
          </div>
        </MenuList>
      )}
    </div>
  );
}

// ---------------- Category Dropdown ----------------

function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        Categories
        <ChevronDown className="h-4 w-4" />
      </Button>

      {open && (
        <MenuList className="absolute top-12 left-0 w-52 bg-white dark:bg-zinc-900 z-50">
          <MenuItem>Electronics</MenuItem>
          <MenuItem>Fashion</MenuItem>
          <MenuItem>Groceries</MenuItem>
          <MenuItem>Home Items</MenuItem>
          <MenuItem>Beauty</MenuItem>
        </MenuList>
      )}
    </div>
  );
}

// ---------------- Main Navbar ----------------

export default function ComplexNavbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">

      {/* TOP NAVBAR */}
      <Card className="rounded-none border-0 shadow-lg bg-white dark:bg-zinc-950 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">

          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-orange-600 whitespace-nowrap"
          >
            GrowMoreSolution
          </Link>

          {/* CATEGORY */}
          <div className="hidden lg:block">
            <CategoryDropdown />
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 relative">
            <Input
              placeholder="Search products..."
              className="pr-10 rounded-full border-orange-200 focus-visible:ring-orange-500"
            />

            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">

            {/* CART */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>

              {cart.length > 0 && (
                <span
                  className="
        absolute -top-2 -right-2
        bg-red-500 text-white
        text-xs w-5 h-5
        flex items-center justify-center
        rounded-full
      "
                >
                  {cart.length}
                </span>
              )}
            </div>

            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Heart className="h-5 w-5" />
              </Button>

              {wishlist.length > 0 && (
                <span
                  className="
        absolute -top-2 -right-2
        bg-red-500 text-white
        text-xs w-5 h-5
        flex items-center justify-center
        rounded-full
      "
                >
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* THEME */}
            <ModeToggle />

            {/* PROFILE */}
            <ProfileMenu />
          </div>

          {/* MOBILE MENU BUTTON */}
          <Button
            size="icon"
            className="lg:hidden ml-auto bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() =>
              setIsMobileNavOpen(!isMobileNavOpen)
            }
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </Card>

      {/* ALWAYS SHOW HEADER */}
      <Header />

      {/* MOBILE NAVIGATION */}
      {isMobileNavOpen && (
        <div className="lg:hidden bg-white dark:bg-zinc-950 border-t shadow-lg">
          <div className="p-4 flex flex-col gap-4">

            {/* SEARCH */}
            <div className="relative">
              <Input
                placeholder="Search products..."
                className="pr-10"
              />

              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
            </div>

            <div className="flex items-center gap-3 flex-wrap">

              {/* CATEGORIES */}
              <CategoryDropdown />

              {/* CART */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>

                {cart.length > 0 && (
                  <span
                    className="
        absolute -top-2 -right-2
        bg-red-500 text-white
        text-xs w-5 h-5
        flex items-center justify-center
        rounded-full
      "
                  >
                    {cart.length}
                  </span>
                )}
              </div>

              {/* WISHLIST */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <Heart className="h-5 w-5" />
                </Button>

                {wishlist.length > 0 && (
                  <span
                    className="
        absolute -top-2 -right-2
        bg-red-500 text-white
        text-xs w-5 h-5
        flex items-center justify-center
        rounded-full
      "
                  >
                    {wishlist.length}
                  </span>
                )}
              </div>

              {/* THEME */}
              <ModeToggle />

              {/* PROFILE */}
              <ProfileMenu />

            </div>
          </div>
        </div>
      )}
    </div>
  );
}