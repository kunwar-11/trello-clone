"use client";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/forms/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "sonner";

export const Header = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef(null);
  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["card", data.id]);
      toast.success(`Card Renamed to ${data.title}`);
      setTitle(data.title);
    },
    onError: (error) => toast.error(error),
  });

  const onBlur = () => {
    inputRef?.current?.form?.requestSubmit();
  };

  const onSubmit = (formData) => {
    const title = formData.get("title");
    if (title === data.title) {
      return;
    }
    execute({
      boardId: params.boardId,
      title,
      id: data.id,
    });
  };
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl text-neutral-700 px-1 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200 mt-1" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
