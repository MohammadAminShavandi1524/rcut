import Link from "next/link";
import { ChevronDown } from "lucide-react";

type FooterItem = {
  title: string;
  href: string;
};

type Props = {
  title: string;
  items: FooterItem[];
};

const FooterColumn = ({ title, items }: Props) => {
  return (
    <div className="min-w-0 text-right">
      {/* Mobile Accordion */}
      <details className="group border-footer-border border-b pb-3 sm:hidden">
        <summary className="text-footer-foreground flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-base font-bold [&::-webkit-details-marker]:hidden">
          <span>{title}</span>

          <ChevronDown
            className="text-footer-muted size-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
            strokeWidth={1.7}
          />
        </summary>

        <ul className="text-footer-muted space-y-4 px-1 pt-3 pb-4 text-sm">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="hover:text-custom-primary transition-colors duration-300"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      {/* Tablet / Desktop */}
      <div className="hidden sm:block">
        <h3 className="text-footer-foreground 3xl:text-lg text-base font-bold lg:text-[15px] xl:text-base 2xl:text-[17px]">
          {title}
        </h3>

        <ul className="text-footer-muted 3xl:mt-6 3xl:space-y-4 mt-5 space-y-3 text-sm sm:space-y-4 lg:mt-4 lg:space-y-3 lg:text-xs xl:mt-5 xl:text-[13px] 2xl:text-sm">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="hover:text-custom-primary transition-colors duration-300"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterColumn;
