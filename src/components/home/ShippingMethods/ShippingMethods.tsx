import { shippingMethods } from "./shipping-methods.data";

const ShippingMethods = () => {
  return (
    <section className="py-24">
      <div className="w90" dir="rtl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-foreground text-4xl font-bold">روش‌های ارسال</h2>

          <p className="text-muted-foreground mt-4">
            سفارش‌های شما با روش‌های مطمئن و متناسب با نیازتان ارسال می‌شود
          </p>
        </div>

        {/* Methods */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3">
          {shippingMethods.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="after:bg-border relative flex flex-col items-center justify-center gap-5 px-8 text-center after:absolute after:end-0 after:top-1/2 after:h-20 after:w-px after:-translate-y-1/2 last:after:hidden"
              >
                <Icon
                  className="text-custom-primary size-14"
                  strokeWidth={1.5}
                />

                <h3 className="text-foreground text-xl font-semibold">
                  {item.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShippingMethods;
