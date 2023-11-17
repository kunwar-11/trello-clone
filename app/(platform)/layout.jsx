import { ClerkProvider } from "@clerk/nextjs";

function PlatformLayout({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default PlatformLayout;
