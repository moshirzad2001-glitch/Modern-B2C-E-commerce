"use client";
import { FacebookLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "./brandlogo";
import {
  DribbbleLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import useTanstack from "@/tanstack data/tanstack";

const legal = ["Accessibility", "Returns Policy", "Refund Policy"];
const helpfullinks = ["Contact", "FAQs", "Live Chat"];
const companynames = ["About", "Meet the Team", "Accounts Review"];
export default function Footer() {
  const { catagorybringing } = useTanstack();
  return (
    <footer className="bg-slate-800 ">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div>
              <BrandLogo />
            </div>

            <p className="mt-4 max-w-xs text-slate-500">
              A high-performance e-commerce portfolio application showcasing 194
              mock consumer goods. This project demonstrates responsive layout
              architectures, asynchronous REST API orchestration via DummyJSON,
              dynamic collection state filtering, and seamless multi-category
              client routing.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  href="/"
                  className="text-slate-500 transition hover:opacity-75"
                >
                  <FacebookLogoIcon className="w-7 h-7 " />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-500 transition hover:opacity-75"
                >
                  <InstagramLogoIcon className="w-7 h-7 " />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-500 transition hover:opacity-75"
                >
                  <TwitterLogoIcon className="w-7 h-7 " />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-500 transition hover:opacity-75"
                >
                  <GithubLogoIcon className="w-7 h-7 " />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-500 transition hover:opacity-75"
                >
                  <DribbbleLogoIcon className="w-7 h-7 " />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-slate-300">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                {catagorybringing?.slice(0, 12).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/search?category=${item.slug}`}
                      className="text-slate-500 transition hover:opacity-75"
                    >
                      {" "}
                      {item.name}{" "}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-300">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                {companynames.map((name) => (
                  <li key={name}>
                    <Link
                      href="/"
                      className="text-slate-500 transition hover:opacity-75"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium text-slate-300">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                {helpfullinks.map((name) => (
                  <li key={name}>
                    <Link
                      href="/"
                      className="text-slate-500 transition hover:opacity-75"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-300">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                {legal.map((name) => (
                  <li key={name}>
                    <Link
                      href="/"
                      className="text-slate-500 transition hover:opacity-75"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; 2026. SYS.OBJ, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
