"use client";

import { Link } from "@/i18n/navigation";

export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 flex-none items-center gap-2.5 text-[17px] leading-[1.05] font-[650] text-primary-900 max-[639px]:gap-1.5 max-[639px]:text-sm"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <svg
        aria-hidden="true"
        className="size-[42px] fill-primary-700 stroke-primary-900 stroke-[1.6] max-[639px]:size-[34px] max-[380px]:hidden"
        strokeLinecap="round"
        viewBox="0 0 40 40"
      >
        <path d="M20 35C9 31 5 23 7 11c7 1 12 5 14 11 2-9 7-15 15-17 1 14-4 23-16 30Z" />
        <path d="M20 35c0-10 1-19 9-25M20 35C18 26 15 19 9 14" />
      </svg>
      <span>
        Tucumán
        <strong className="block text-xl font-[750] max-[639px]:text-[17px]">
          Market
        </strong>
      </span>
    </Link>
  );
}
