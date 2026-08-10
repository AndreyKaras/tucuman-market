import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  "aria-hidden": true,
  fill: "none",
  height: 24,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
  viewBox: "0 0 24 24",
  width: 24,
};

export const SearchIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CartIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const TrashIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </svg>
);

export const SlidersIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4 7h10m4 0h2M4 17h2m4 0h10M14 4v6M10 14v6" />
  </svg>
);

export const TruckIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export const StoreIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4 10v10h16V10M3 6h18l-1 4a3 3 0 0 1-5 1 3 3 0 0 1-6 0 3 3 0 0 1-5-1Z" />
    <path d="M9 20v-5h6v5" />
  </svg>
);

export const AlertIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6m0 4h.01" />
  </svg>
);

export const HomeIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m3 11 9-8 9 8v10h-6v-6H9v6H3Z" />
  </svg>
);

export const PackageIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m4 7 8-4 8 4v10l-8 4-8-4Z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </svg>
);

type CategoryIconProps = IconProps & {
  kind: string;
};

export function CategoryIcon({ kind, ...props }: CategoryIconProps) {
  const content = {
    bakery: <><path d="M5 19c-2-5 1-11 7-14 6 3 9 9 7 14Z" /><path d="m8 14 3-2m1 5 3-2m-5-6 2-1" /></>,
    beverages: <><path d="M9 3h6M10 3v4l-2 3v11h8V10l-2-3V3" /><path d="M8 13h8" /></>,
    "dairy-eggs": <><path d="M5 20V8l3-5h6l3 5v12Z" /><path d="M5 9h12M9 3v6" /></>,
    frozen: <><path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M8 4l4 4 4-4M8 20l4-4 4 4" /></>,
    "fruit-vegetables": <><path d="M12 8c-4-3-9 0-8 6 1 5 5 7 8 4 3 3 7 1 8-4 1-6-4-9-8-6Z" /><path d="M12 8c0-3 2-5 5-5-1 3-2 5-5 5Z" /></>,
    "meat-deli": <><path d="M5 8c3-5 10-5 14 0 3 4-1 10-6 10-3 0-4-2-6-1-3 1-5-6-2-9Z" /><circle cx="14" cy="10" r="2" /></>,
    pantry: <><path d="M7 3h10l1 4-1 14H7L6 7Z" /><path d="M6 7h12M9 12h6" /></>,
    "snacks-sweets": <><path d="m5 7 4 2h6l4-2-2 14H7Z" /><path d="M9 4h6l2 3H7Z" /></>,
  }[kind] ?? <><path d="m4 7 8-4 8 4v10l-8 4-8-4Z" /><path d="m4 7 8 4 8-4M12 11v10" /></>;

  return (
    <svg {...defaults} {...props}>
      {content}
    </svg>
  );
}
