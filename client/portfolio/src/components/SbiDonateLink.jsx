import { SBI_COLLECT_URL } from "../data/payments.js";

export default function SbiDonateLink({ children, className, onClick }) {
  return <a href={SBI_COLLECT_URL} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className={className} onClick={onClick}>{children}</a>;
}
