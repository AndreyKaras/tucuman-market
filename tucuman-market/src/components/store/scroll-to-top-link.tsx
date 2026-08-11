"use client";

import { useEffect, useRef, type ComponentProps } from "react";

import { Link, usePathname } from "@/i18n/navigation";

type ScrollToTopLinkProps = ComponentProps<typeof Link>;

export function scrollToPageTop() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0 });
  root.style.scrollBehavior = previousScrollBehavior;
}

export function useScrollToPageTopAfterNavigation() {
  const pathname = usePathname();
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (!shouldScrollRef.current) return;

    shouldScrollRef.current = false;
    const frame = window.requestAnimationFrame(scrollToPageTop);

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return () => {
    shouldScrollRef.current = true;
    scrollToPageTop();
  };
}

export function ScrollToTopLink({ onClick, ...props }: ScrollToTopLinkProps) {
  const scrollToTop = useScrollToPageTopAfterNavigation();

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) scrollToTop();
      }}
    />
  );
}
