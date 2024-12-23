"use client";

import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { useSearchParam } from "@/hooks/use-search-param";

const Search: FunctionComponent = () => {
  const [search, setSearch] = useSearchParam("search");

  const [value, setValue] = useState<string>(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClear = useCallback(() => {
    setValue("");
    inputRef.current?.blur();
    setSearch("");
  }, [setSearch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center ">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="md:text-base placeholder:text-zinc-200/40 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15] rounded-full h-[48px] focus-visible:ring-0"
          aria-label="Search"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type={"button"}
            variant={"ghost"}
            size="icon"
            className="transition-all duration-700 ease-in-out absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <X />
          </Button>
        )}
      </form>
    </div>
  );
};

export default Search;
