"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full border-t border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="mx-auto flex items-center justify-center gap-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">

        <Link
          href="/collection"
          className="hover:text-black dark:hover:text-white transition"
        >
          Collection
        </Link>

        <div className="h-4 w-px bg-gray-300" />

        <Link
          href="/help"
          className="hover:text-black dark:hover:text-white transition"
        >
          Help
        </Link>

        <div className="h-4 w-px bg-gray-300" />

        <Link
          href="/offer"
          className="hover:text-black dark:hover:text-white transition"
        >
          Offer
        </Link>

        <div className="h-4 w-px bg-gray-300" />


        <Link
          href="/contact"
          className="hover:text-black dark:hover:text-white transition"
        >
          Contact
        </Link>

        <div className="h-4 w-px bg-gray-300" />

        <Link
          href="/about"
          className="hover:text-black dark:hover:text-white transition"
        >
          About
        </Link>
      </div>
    </div>
  );
}