"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TiThMenuOutline } from "react-icons/ti";
import { useTranslations } from "next-intl";
import LocalSwitcher from "./localSwitcher";
import { useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale;
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  const handleSignOut = async () => {
    const result = await signOut({ 
      callbackUrl: `/${locale}/login`,
      redirect: false
    });
    
    // router.push(result.url);
  };

  const Links = [
    { title: t("Home"), url: `/${locale}` },
    { title: t("Blog"), url: `/${locale}/blog` },
    { title: t("Contact"), url: `/${locale}/contact` },
    { title: t("About"), url: `/${locale}/about` },
  ];

  function LoginStatusButton() {
    if (sessionStatus !== "authenticated") {
      return (
        <Link
          href={`/${locale}/login`}
          className={`p-2 mx-2 rounded-2xl w-36 text-center border border-transparent hover:border hover:bg-violet-400 hover:text-black}`}
        >
          {t("Login")}
        </Link>
      );
    } else {
      return (
        
        <button
          onClick={handleSignOut}
          className={`p-2 mx-2  w-24 text-center border border-transparent hover:border bg-blue-600 text-white hover:text-black}`}
        >
          {t("Logout")}
        </button>
      );
    }
  }

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
                  pathname === link.url ? "bg-violet-400 text-black" : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
            <LocalSwitcher />
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
                pathname === link.url ? "bg-violet-400 text-black" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
          <LocalSwitcher />
          <LoginStatusButton />
        </div>
      </div>
    </nav>
  );
}
