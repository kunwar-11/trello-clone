import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
