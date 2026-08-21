"use client";

import { Heart, MapPin, Package, PencilLine, ShoppingBag, Wallet } from "lucide-react";
import { Button, Empty } from "antd";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useAuth } from "@/features/auth/AuthProvider";
import { addressStore } from "@/features/checkout/checkoutStores";
import { useCurrency } from "@/features/currency/CurrencyProvider";
import { OrderCard } from "@/features/orders/OrderCard";
import { useOrders } from "@/features/orders/orderStore";
import { useWishlist } from "@/features/wishlist/WishlistProvider";
import { ROUTES } from "@/lib/constants";
import { usePersistentValue } from "@/lib/persistentStore";
import type { ReactNode } from "react";

/** Orders shown inline before the shopper is sent to the full history. */
const RECENT_COUNT = 2;

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="surface-card account-stat">
      <span className="account-stat-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  const orders = useOrders();
  const address = usePersistentValue(addressStore);
  const { products: saved } = useWishlist();
  const { format } = useCurrency();

  const itemsOrdered = orders.reduce((sum, order) => sum + order.totals.itemCount, 0);
  const spent = orders.reduce((sum, order) => sum + order.totals.total, 0);

  return (
    <>
      <h1 className="listing-title account-title">
        Hi, {user?.name.split(" ")[0]}
      </h1>
      <p className="account-subtitle">
        Everything you have ordered, saved and shipped to — in one place.
      </p>

      <div className="account-stats">
        <Stat icon={<Package />} label="Orders placed" value={String(orders.length)} />
        <Stat icon={<ShoppingBag />} label="Items ordered" value={String(itemsOrdered)} />
        <Stat icon={<Wallet />} label="Total spent" value={format(spent)} />
        <Stat icon={<Heart />} label="Saved items" value={String(saved.length)} />
      </div>

      <section className="section">
        <SectionHeading
          title="Recent orders"
          subtitle={
            orders.length > 0
              ? "Track a delivery or reorder in one tap"
              : "Your orders will show up here once you check out"
          }
          href={orders.length > RECENT_COUNT ? ROUTES.orders : undefined}
          linkLabel="All orders"
        />

        {orders.length > 0 ? (
          <div className="order-list">
            {orders.slice(0, RECENT_COUNT).map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="surface-card empty-state">
            <Empty description="No orders yet" />
            <Link href={ROUTES.products}>
              <Button type="primary" size="large" icon={<Package />}>
                Start shopping
              </Button>
            </Link>
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeading title="Delivery address" subtitle="Used to prefill checkout" />

        <div className="surface-card card-pad-lg account-address">
          {address ? (
            <>
              <p>
                <strong>{address.fullName}</strong>
                <br />
                {address.addressLine}
                {address.landmark ? `, ${address.landmark}` : ""}
                <br />
                {address.city}, {address.state} {address.pincode}
                <br />
                +91 {address.phone} · {address.email}
              </p>
              <Link href={ROUTES.checkout}>
                <Button icon={<PencilLine />}>Edit</Button>
              </Link>
            </>
          ) : (
            <>
              <p className="account-address-empty">
                <MapPin /> No saved address yet — the one you enter at checkout is kept
                here for next time.
              </p>
              <Link href={ROUTES.checkout}>
                <Button>Add an address</Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
