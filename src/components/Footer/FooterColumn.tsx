type Props = {
  title: string;
  items: string[];
};

const FooterColumn = ({ title, items }: Props) => {
  return (
    <div className="text-right">
      <h3 className="text-footer-foreground text-lg font-bold">{title}</h3>

      <ul className="text-footer-muted mt-6 space-y-4 text-sm">
        {items.map((item) => (
          <li
            key={item}
            className="hover:text-custom-primary cursor-pointer transition-colors duration-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
