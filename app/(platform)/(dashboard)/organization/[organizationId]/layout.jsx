import { OrgControl } from "./_component/OrgControl";

function OrganizationIdLayout({ children }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
