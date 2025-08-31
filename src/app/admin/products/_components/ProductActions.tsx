"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/products";

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
        });
      }}
      disabled={isPending}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  isAvailableForPurchase,
  disabled,
}: {
  id: string;
  isAvailableForPurchase: boolean;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
      disabled={isPending || disabled}
      variant="destructive"
    >
      Delete
    </DropdownMenuItem>
  );
}
