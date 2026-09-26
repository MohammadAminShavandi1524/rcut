"use client";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-[230px]">
      <Search className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2" />

      <input
        type="search"
        placeholder="جستجوی محصول..."
        className="
          border-border
          bg-secondary-bg
          text-foreground
          placeholder:text-muted-foreground
          h-[42px]
          w-full
          rounded-lg
          border
          pr-10
          pl-3
          text-sm
          outline-none
          transition-colors
          focus:border-custom-primary
        "
      />
    </div>
  );
};

export default SearchBar;
