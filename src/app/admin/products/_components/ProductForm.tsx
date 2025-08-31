"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useActionState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );

  const [priceInCentes, setPriceInCentes] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ""}
          required
        />
        {error.name && <p className="text-destructive">{error.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCentes}
          onChange={(e) =>
            setPriceInCentes(Number(e.target.value) || undefined)
          }
        />
        {error.priceInCents && (
          <p className="text-destructive">{error.priceInCents}</p>
        )}
        <div className="text-muted-foreground">
          {formatCurrency((priceInCentes || 0) / 100)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description || ""}
          required
        />
        {error.description && (
          <p className="text-destructive">{error.description}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        {error.file && <p className="text-destructive">{error.file}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required={product == null}
        />
        {product != null && (
          <Image
            src={product.imagePath}
            alt={product.name}
            width={400}
            height={400}
          />
        )}
        {error.image && <p className="text-destructive">{error.image}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
