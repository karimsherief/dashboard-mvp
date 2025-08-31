import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

import { randomUUID } from "crypto";
import { OrderInformation } from "./components/OrderInformation";
import { Fragment } from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: randomUUID(),
      product: {
        name: "Product name",
        description: "Some description",
        imagePath: "/products/4e676a04-4d86-49ce-b8c2-8489e42a700a-karim.jpeg",
      },
    },
    {
      id: randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 20000,
      downloadVerificationId: randomUUID(),
      product: {
        name: "Product name 2",
        description: "Some description",
        imagePath: "/products/4e676a04-4d86-49ce-b8c2-8489e42a700a-karim.jpeg",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
