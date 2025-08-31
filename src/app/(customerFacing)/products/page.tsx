import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";
import { get } from "http";
import { Suspense } from "react";

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

export default async function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProdcutsSuspense />
      </Suspense>
    </div>
  );
}

async function ProdcutsSuspense({ productsFetcher }: any) {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
