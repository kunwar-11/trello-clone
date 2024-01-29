import { FormPopup } from "@/components/forms/form-popover";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-14 z-50 border-b shadow-sm bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopup align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="rounded-sm hidden md:block h-auto px-2 py-1.5"
            variant="primary"
          >
            Create
          </Button>
        </FormPopup>
        <FormPopup>
          <Button
            size="sm"
            className="rounded-sm block md:hidden "
            variant="primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopup>
      </div>
      <div className="flex gap-x-4 items-center">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
