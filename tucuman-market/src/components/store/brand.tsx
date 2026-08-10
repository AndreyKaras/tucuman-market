import { Link } from "@/i18n/navigation";

export function Brand() {
  return (
    <Link href="/" className="brand">
      <svg
        aria-hidden="true"
        className="brand__mark"
        viewBox="0 0 40 40"
      >
        <path d="M20 35C9 31 5 23 7 11c7 1 12 5 14 11 2-9 7-15 15-17 1 14-4 23-16 30Z" />
        <path d="M20 35c0-10 1-19 9-25M20 35C18 26 15 19 9 14" />
      </svg>
      <span>
        Tucumán
        <strong>Market</strong>
      </span>
    </Link>
  );
}
