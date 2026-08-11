type ClassValue = false | null | string | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

export const containerClass =
  "mx-auto w-full max-w-[1280px] px-4 sm:px-6 min-[901px]:px-8";

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-[650] transition-[background-color,border-color,color,transform] duration-[140ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] active:not-disabled:scale-[0.97] disabled:cursor-not-allowed [&_svg]:size-5";

export const primaryButtonClass = cn(
  buttonBase,
  "border-transparent bg-primary-700 text-white hover:bg-primary-800 disabled:border-line disabled:bg-surface-strong disabled:text-ink-muted",
);

export const secondaryButtonClass = cn(
  buttonBase,
  "border-line-strong bg-white text-primary-800 hover:border-primary-700 hover:bg-primary-50",
);

export const compactButtonClass = "h-10 px-4";

export const iconButtonClass =
  "inline-flex size-11 items-center justify-center rounded-lg border border-line bg-white p-0 transition-[background-color,border-color,color,transform] duration-[140ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-primary-700 hover:text-primary-700 active:not-disabled:scale-[0.97]";

export const dangerIconButtonClass = cn(
  iconButtonClass,
  "hover:border-danger hover:text-danger",
);

export const textLinkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-sm font-[650] text-primary-800 transition-colors duration-[140ms] hover:underline hover:underline-offset-4 [&_svg]:size-[18px]";

export const badgeBaseClass =
  "rounded-sm px-2 py-1 text-[11px] leading-[1.2] font-bold";
export const saleBadgeClass = cn(
  badgeBaseClass,
  "bg-accent-700 text-white",
);
export const warningBadgeClass = cn(
  badgeBaseClass,
  "bg-accent-100 text-[#7c3500]",
);
export const outBadgeClass = cn(
  badgeBaseClass,
  "border border-line-strong bg-surface-strong text-ink",
);

export const quantityControlClass =
  "inline-grid grid-cols-[44px_38px_44px] items-center overflow-hidden rounded-lg border border-line";
export const quantityButtonClass =
  "flex h-11 items-center justify-center border-0 bg-white p-0 transition-[background-color,color,transform] duration-[140ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-primary-50 hover:text-primary-700 active:scale-90 disabled:bg-surface-muted disabled:text-ink-subtle [&_svg]:size-[17px]";
export const quantityOutputClass =
  "text-center text-sm motion-safe:animate-[quantity-pop_140ms_cubic-bezier(0.2,0.8,0.2,1)]";

export const emptyStateClass = "flex flex-col items-center text-center";
export const emptyStateIconClass =
  "inline-flex size-[72px] items-center justify-center rounded-full bg-primary-50 text-primary-700 [&_svg]:size-9";
