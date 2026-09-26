import Image from "next/image";

type Props = {
  product: {
    image: string;
    name: string;
    description: string;
  };

  featured?: boolean;
};

const NewProductCard = ({ product, featured = false }: Props) => {
  return (
    <article
      dir="rtl"
      className={`group border-border bg-background hover:border-custom-primary overflow-hidden rounded-2xl border transition-colors duration-300 ${featured ? "h-full" : ""} `}
    >
      <div
        className={`relative ${featured ? "aspect-[4/3]" : "aspect-square"} `}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <span className="bg-custom-primary absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white">
          جدید
        </span>
      </div>

      <div className="border-border border-t p-5 text-right">
        <h3 className="text-foreground text-lg font-bold">{product.name}</h3>

        <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-6">
          {product.description}
        </p>

        <button
          type="button"
          className="text-custom-primary hover:text-foreground mt-5 cursor-pointer text-sm font-semibold transition-colors"
        >
          مشاهده محصول
        </button>
      </div>
    </article>
  );
};

export default NewProductCard;
