import { shippingMethods } from "./shipping-methods.data";

const ShippingMethods = () => {
  return (
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 xl:pb-24">
      <div className="w90" dir="rtl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-foreground xss:text-[25px] text-[23px] leading-[1.5] font-bold sm:text-[28px] lg:text-[32px] xl:text-4xl">
            روش‌های ارسال
          </h2>

          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-[13px] leading-7 sm:mt-4 sm:text-sm sm:leading-8 lg:text-base">
            سفارش‌های شما با روش‌های مطمئن و متناسب با نیازتان ارسال می‌شود
          </p>
        </div>

        {/* Shipping Methods */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-2 sm:mt-10 sm:gap-4 lg:mt-14 lg:gap-6">
          {shippingMethods.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group flex min-w-0 flex-col items-center justify-center gap-3 px-1 py-3 text-center sm:gap-4 sm:px-3 sm:py-4 lg:gap-5 lg:px-8"
              >
                <Icon
                  className="text-custom-primary ease xss:size-10 size-9 shrink-0 transition-transform duration-500 group-hover:scale-110 sm:size-12 lg:size-14"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <h3 className="text-foreground group-hover:text-custom-primary xss:text-sm text-[13px] leading-6 font-semibold transition-colors duration-300 sm:text-base lg:text-xl">
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
