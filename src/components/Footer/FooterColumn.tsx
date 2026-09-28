import Link from "next/link";

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
    <div className="text-right">
      <h3 className="text-footer-foreground text-lg font-bold">{title}</h3>

      <ul className="text-footer-muted mt-6 space-y-4 text-sm">
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
  );
};

export default FooterColumn;
