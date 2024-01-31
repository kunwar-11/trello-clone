"use client";
import { createCard } from "@/actions/create-card";
import { FormButton } from "@/components/forms/form-button";
import { FormTextArea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

export const CardForm = forwardRef(
  ({ listId, enableEditing, isEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" Created`);
        formRef.current?.reset();
      },
      onError: (error) => toast.error(error),
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const textAreaKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData) => {
      const title = formData?.get("title");
      const listId = formData?.get("listId");
      const boardId = params.boardId;

      execute({
        title,
        listId,
        boardId,
      });
    };

    if (isEditing) {
      return (
        <form
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
          ref={formRef}
        >
          <FormTextArea
            id="title"
            onKeyDown={textAreaKeyDown}
            ref={ref}
            placeholder="Enter Card Title..."
            error={fieldErrors}
          />
          <input type="hidden" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormButton variant="primary">Add Card</FormButton>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto px-2 py-1.5 text-muted-foreground w-full justify-start"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
