import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

import { randomUUID } from "crypto";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Some description",
    imagePath: "/products/4e676a04-4d86-49ce-b8c2-8489e42a700a-karim.jpeg",
  },
  order: {
    id: randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
   
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
