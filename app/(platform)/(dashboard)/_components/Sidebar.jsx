"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { NavItems } from "./NavItems";

export function Sidebar({ storageKey = "t-sidebar-state" }) {
  const [expanded, setExpanded] = useLocalStorage(storageKey, {});
  const { organization: activeOrganization, isLoaded: isOrgLoaded } =
    useOrganization();
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordianValue = Object.keys(expanded).reduce((acc, curr) => {
    if (expanded[curr]) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const onExpand = (id) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isOrgListLoaded || !isOrgLoaded || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItems.Skeleton />
          <NavItems.Skeleton />
          <NavItems.Skeleton />
          <NavItems.Skeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordianValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItems
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            expanded={expanded[organization.id]}
            onExpand={onExpand}
            organization={organization}
          />
        ))}
      </Accordion>
    </>
  );
}
