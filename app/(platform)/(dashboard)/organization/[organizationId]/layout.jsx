import { auth } from "@clerk/nextjs";
import { OrgControl } from "./_component/OrgControl";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: orgSlug || "Organization",
  };
}

function OrganizationIdLayout({ children }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
