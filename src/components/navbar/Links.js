"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TiThMenuOutline } from "react-icons/ti";
import { useSession, signOut } from "next-auth/react";
import { sendStatusCode } from "next/dist/server/api-utils";

const Links = [
  { title: "Home", url: "/" },
  { title: "Blog", url: "/blog" },
  { title: "Contact", url: "/contact" },
  { title: "About", url: "/about" },
];

export default function Navigation() {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  function LoginStatusButton() {
    if (sessionStatus !== "authenticated") {
      return (
        <Link
          href="/login"
          className={`p-2 mx-2 rounded-2xl w-36 text-center border border-transparent hover:border hover:bg-violet-400 hover:text-black}`}
        >
          Login
        </Link>
      );
    } else {
      return (
        <button
          onClick={() => signOut()}
          className={`p-2 mx-2 rounded-2xl w-36 text-center border border-transparent hover:border hover:bg-violet-400 hover:text-black}`}
        >
          Logout
        </button>
      );
    }
  }

  // console.log("okk", sessionStatus);
  return (
    <nav className="relative">
      <div className="flex justify-between items-center my-3 px-5">
        <div
          className={`fixed top-12 md:hidden ${
            isOpen ? "right-[180px]" : "right-[10px]"
          }`}
        >
          <TiThMenuOutline
            className={`text-2xl cursor-pointer `}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="hidden md:block">
          <div className="flex">
            {Links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className={`p-2 mx-2 rounded-2xl w-36 text-center border border-transparent hover:border hover:bg-violet-400 hover:text-black ${
                  currentPath === link.url ? "bg-violet-400 text-black" : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
            <LoginStatusButton />
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? "fixed  z-50 right-0" : "hidden"} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full">
          {Links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`p-4 m-2 rounded-md border w-36 text-center border-transparent hover:border hover:bg-violet-400 hover:text-black ${
                currentPath === link.url ? "bg-violet-400 text-black" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
          <LoginStatusButton />
        </div>
      </div>
    </nav>
  );
}
