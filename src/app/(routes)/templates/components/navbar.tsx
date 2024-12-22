import type { FunctionComponent } from "react";
import Link from "next/link";
import Search from "@/app/(routes)/templates/components/search";

const Navbar: FunctionComponent = () => {
  return (
    <nav className={"flex items-center justify-between h-full w-full"}>
      <div className={"flex gap-3 items-center shrink-0 pr-6"}>
        <Link className="text-2xl" id={"logo"} href={"/public"}>
          Docxer
        </Link>
        <h3 className={"text-xl"}>Docs</h3>
      </div>
      <Search />
      <div />
    </nav>
  );
};

export default Navbar;
