import OrderListPublic, { Orders } from "@/components/OrderListPublic";
import startDb from "@/lib/db";
import OrderModel from "@/models/orderModel";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import React from "react";

const fetchOrders = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  await startDb();
  const orders = await OrderModel.find({ userId: session.user.id }).sort(
    "-createdAt"
  );
  const result: Orders[] = orders.map((order) => {
    return {
      // @ts-ignore
      id: order._id.toString(),
      paymentStatus: order.paymentStatus,
      date: order.createdAt.toString(),
      total: order.totalAmount,
      deliveryStatus: order.deliveryStatus,
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

export default async function Order() {
  const result = await fetchOrders();
  if (!result) {
    return redirect("/404");
  }

  return (
    <div>
      <OrderListPublic orders={JSON.parse(result)} />
    </div>
  );
}
