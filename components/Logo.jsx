import Image from "next/image";
import Link from "next/link";
import localfont from "next/font/local";
import { cn } from "@/lib/utils";

const textFont = localfont({
  src: "../public/fonts/font.woff2",
});

export function Logo() {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex ">
        <Image src="/logo.svg" width={30} height={30} alt="logo" />
        <p className={cn("text-lg text-neutral-700 pb1", textFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
}
