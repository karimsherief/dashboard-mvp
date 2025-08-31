"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "../../_actions/users";

export function DeleteDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(async () => {
          await deleteUser(id);
        });
      }}
      disabled={isPending}
      variant="destructive"
    >
      Delete
    </DropdownMenuItem>
  );
}
