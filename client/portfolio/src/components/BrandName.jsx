import { Fragment } from "react";

const BRAND_PATTERN = /(ERGON Foundation|Ergon Foundation|ERGON FOUNDATION)/gi;
const BRAND_EXACT = /^(ERGON Foundation|Ergon Foundation|ERGON FOUNDATION)$/i;

export function BrandName({ className = "" }) {
  return <span className={`ergon-brand-name ${className}`.trim()}>ERGON FOUNDATION</span>;
}

export function BrandText({ children }) {
  if (typeof children !== "string") return children;

  return children.split(BRAND_PATTERN).map((part, index) =>
    BRAND_EXACT.test(part)
      ? <BrandName key={`${part}-${index}`} />
      : <Fragment key={`${part}-${index}`}>{part}</Fragment>
  );
}
