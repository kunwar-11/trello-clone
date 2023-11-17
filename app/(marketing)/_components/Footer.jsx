import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <nav className="fixed bottom-0 w-full  bg-slate-100 border-t flex items-center p-6">
      <div className="md:max-w-screen-xl flex justify-between items-center w-full mx-auto">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms And Conditions
          </Button>
        </div>
      </div>
    </nav>
  );
}
