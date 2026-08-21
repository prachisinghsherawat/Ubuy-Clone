"use client";

import { Package } from "lucide-react";
import { Segmented } from "antd";
import { useState } from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { OrderCard } from "@/features/orders/OrderCard";
import { useOrders } from "@/features/orders/orderStore";
import { ORDER_STATUSES, orderStatus, type OrderStatus } from "@/features/orders/status";
import { ROUTES } from "@/lib/constants";

type Filter = OrderStatus | "all";

export default function OrdersPage() {
  const orders = useOrders();
  const [filter, setFilter] = useState<Filter>("all");

  // Computed once per render and reused by both the counts and the list, so a
  // status can never be counted under one heading and listed under another.
  const staged = orders.map((order) => ({ order, status: orderStatus(order).key }));
  const visible =
    filter === "all" ? staged : staged.filter((entry) => entry.status === filter);

  const options = [
    { value: "all" as const, label: `All (${staged.length})` },
    ...ORDER_STATUSES.map((status) => ({
      value: status.key,
      label: `${status.label} (${staged.filter((entry) => entry.status === status.key).length})`,
    })),
  ];

  if (orders.length === 0) {
    return (
      <>
        <h1 className="listing-title account-title">Your orders</h1>
        <EmptyState
          description="You have not placed an order yet"
          hint="Once you check out, every order shows up here with its delivery status."
          action={{ href: ROUTES.products, label: "Start shopping", icon: <Package /> }}
        />
      </>
    );
  }

  return (
    <>
      <div className="listing-head account-orders-head">
        <div>
          <h1 className="listing-title account-title">Your orders</h1>
          <p className="account-subtitle">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed with this
            browser
          </p>
        </div>

        <Segmented<Filter>
          value={filter}
          onChange={setFilter}
          options={options}
          aria-label="Filter orders by status"
        />
      </div>

      {visible.length > 0 ? (
        <div className="order-list">
          {visible.map(({ order }) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState description="No orders with that status" bare />
      )}
    </>
  );
}
