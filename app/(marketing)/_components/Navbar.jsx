import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-14 bg-white border-b shadow-sm flex items-center px-4">
      <div className="md:max-w-screen-xl flex justify-between items-center w-full mx-auto">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify For Free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
