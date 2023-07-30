import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { NavLinks } from "@/constants";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import { BellIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BellIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt="flexxible"
                  />
                </Link>
              </div>

              {/* Desktop navigation */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {NavLinks.map((item) => (
                    <Link key={item.key} href={item.href}className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}>
                   
                        {item.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Profile dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex items-center space-x-2">
                    {status === "authenticated" ? (
                      <div className="flex flex-col items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session?.user?.image || "..."}
                          alt=""
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => signIn("google")}
                        className="rounded-full bg-slate-600 p-2 text-white"
                      >
                        Sign in with Google
                      </button>
                    )}

                    <Link href="/create-project"className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
                        Share work
                    </Link>
                  </Menu.Button>

                  {/* Profile dropdown menu */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {status === "authenticated" && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {/* You can add any additional user profile information here */}
                              </div>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <Disclosure.Panel className="sm:hidden">
  <div className="px-2 pt-2 pb-3 space-y-1">
    {NavLinks.map((item) => (
      <Link key={item.key} href={item.href} className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block px-3 py-2 rounded-md text-base font-medium"
          )}
          aria-current={item.current ? "page" : undefined}>
         
          {item.text}
      </Link>
    ))}
  </div>
</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
