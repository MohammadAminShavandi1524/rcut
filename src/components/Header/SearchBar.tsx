"use client";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="3xl:w-[230px] relative w-[145px] xl:w-[175px] 2xl:w-[200px]">
      <Search className="text-muted-foreground absolute top-1/2 right-3 size-3.5 -translate-y-1/2 xl:size-4" />

      <input
        type="search"
        placeholder="جستجوی محصول..."
        className="border-border bg-secondary-bg text-foreground placeholder:text-muted-foreground focus:border-custom-primary 3xl:h-[42px] 3xl:text-sm h-[36px] w-full rounded-lg border pr-9 pl-2 text-[11px] transition-colors outline-none xl:h-[38px] xl:pr-10 xl:pl-3 xl:text-[12px] 2xl:h-[40px] 2xl:text-[13px]"
      />
    </div>
  );
};

export default SearchBar;
