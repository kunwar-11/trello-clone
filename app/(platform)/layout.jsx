import { ModalProvider } from "@/components/providers/ModalProvider";
import { QuerProvider } from "@/components/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <QuerProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QuerProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
