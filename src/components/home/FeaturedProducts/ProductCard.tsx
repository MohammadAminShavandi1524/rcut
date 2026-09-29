import Image from "next/image";

type Props = {
  product: {
    image: string;
    name: string;
    description: string;
  };
};

const ProductCard = ({ product }: Props) => {
  return (
    <article
      dir="rtl"
      className="border-border bg-background hover:border-custom-primary flex min-h-[470px] flex-col overflow-hidden rounded-2xl border transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6"
        />
      </div>

      <div className="bg-border h-px" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 text-right">
        <h3 className="text-foreground min-h-6 text-base font-bold">
          {product.name}
        </h3>

        <p className="text-muted-foreground mt-3 line-clamp-2 min-h-[48px] text-sm leading-6">
          {product.description}
        </p>

        <button
          type="button"
          className=" bg-custom-primary mt-6.5 cursor-pointer rounded-lg py-2.5 text-[15px] font-semibold transition-colors duration-300 text-white"
        >
          استعلام قیمت
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
