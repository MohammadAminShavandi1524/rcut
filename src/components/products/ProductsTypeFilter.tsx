"use client";

type Props = {
  bestSellerOnly: boolean;
  onChange: (value: "all" | "best-seller") => void;
};

const ProductsTypeFilter = ({
  bestSellerOnly,
  onChange,
}: Props) => {
  const handleToggle = () => {
    onChange(bestSellerOnly ? "all" : "best-seller");
  };

  return (
    <div className="border-border border-t p-6">
      <button
        type="button"
        role="switch"
        aria-checked={bestSellerOnly}
        onClick={handleToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4"
      >
        <span className="text-foreground text-sm font-semibold">
          فقط پرفروش‌ترین‌ها
        </span>

        {/* Switch */}
        <span
          dir="ltr"
          className={`relative flex h-6 w-12 shrink-0 items-center rounded-full p-1 transition-colors duration-300 ${
            bestSellerOnly
              ? "bg-custom-primary"
              : "bg-foreground/30"
          }`}
        >
          <span
            className={`size-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
              bestSellerOnly ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </span>
      </button>
    </div>
  );
};

export default ProductsTypeFilter;