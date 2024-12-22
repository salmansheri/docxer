import { ReactNode } from "react";
import { HeartIcon } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex">
      <div className="flex-1 min-h-dvh  lg:flex flex-col items-center justify-center hidden md:block">
        <h1 className="text-4xl  text-balance font-bold bg-gradient-to-r from-rose-500 to-pink-700 bg-clip-text text-transparent">
          Welcome to Docxer{" "}
        </h1>
        <p className="inline-flex text-balance ">
          Made with <HeartIcon className="text-rose-500 mr-2 ml-2" /> by Salman
          Sheriff
        </p>
      </div>
      <div className="flex-1 min-h-dvh flex px-4 lg:px-0 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
