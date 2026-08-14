"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/features/cart/CartProvider";
import { OrderSummary } from "@/features/cart/OrderSummary";
import { addressStore } from "@/features/checkout/checkoutStores";
import { CheckoutSteps } from "@/features/checkout/CheckoutSteps";
import { EmptyCartNotice } from "@/features/checkout/EmptyCartNotice";
import { useAuth } from "@/features/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";
import { usePersistentValue } from "@/lib/persistentStore";
import type { ShippingAddress } from "@/types";

const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, totals, hydrated } = useCart();
  const { user } = useAuth();
  const saved = usePersistentValue(addressStore);

  const submit = (values: ShippingAddress) => {
    addressStore.set(values);
    router.push(ROUTES.payment);
  };

  if (!hydrated) {
    return (
      <div className="container page">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container page">
        <CheckoutSteps current={0} />
        <EmptyCartNotice />
      </div>
    );
  }

  return (
    <div className="container page">
      <CheckoutSteps current={0} />

      <div className="checkout-grid">
        <div className="surface-card" style={{ padding: 24 }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>
            Shipping address
          </h1>
          <p style={{ margin: "0 0 20px", color: "var(--ink-muted)", fontSize: 14 }}>
            We ship internationally — this is where your order will land.
          </p>

          <Form<ShippingAddress>
            layout="vertical"
            requiredMark="optional"
            // A previously saved address prefills the form; a signed-in shopper
            // gets their account details as a starting point.
            initialValues={
              saved ?? {
                fullName: user?.name ?? "",
                email: user?.email ?? "",
                phone: user?.mobile ?? "",
              }
            }
            onFinish={submit}
          >
            <Form.Item
              name="fullName"
              label="Full name"
              rules={[{ required: true, message: "Enter the recipient's full name" }]}
            >
              <Input size="large" placeholder="Priya Sharma" autoComplete="name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Enter an email for order updates" },
                { type: "email", message: "That does not look like a valid email" },
              ]}
            >
              <Input size="large" placeholder="you@example.com" autoComplete="email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Mobile number"
              rules={[
                { required: true, message: "Enter a mobile number for delivery updates" },
                {
                  pattern: /^[6-9]\d{9}$/,
                  message: "Enter a 10-digit Indian mobile number",
                },
              ]}
            >
              <Input
                size="large"
                addonBefore="+91"
                placeholder="9876543210"
                maxLength={10}
                autoComplete="tel-national"
              />
            </Form.Item>

            <Form.Item
              name="addressLine"
              label="Address"
              rules={[{ required: true, message: "Enter the street address" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Flat / house no., building, street, area"
                autoComplete="street-address"
              />
            </Form.Item>

            <Form.Item name="landmark" label="Landmark">
              <Input size="large" placeholder="Near the metro station (optional)" />
            </Form.Item>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Enter a city" }]}
              >
                <Input size="large" autoComplete="address-level2" />
              </Form.Item>

              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: "Pick a state" }]}
              >
                <Select
                  size="large"
                  showSearch
                  placeholder="Select"
                  options={STATES.map((state) => ({ value: state, label: state }))}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="pincode"
              label="PIN code"
              rules={[
                { required: true, message: "Enter a PIN code" },
                { pattern: /^\d{6}$/, message: "PIN codes are 6 digits" },
              ]}
            >
              <Input
                size="large"
                maxLength={6}
                style={{ maxWidth: 220 }}
                autoComplete="postal-code"
              />
            </Form.Item>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
              >
                Continue to payment
              </Button>
              <Link href={ROUTES.cart}>
                <Button type="link">Back to cart</Button>
              </Link>
            </div>
          </Form>
        </div>

        <OrderSummary totals={totals} title="Your order" />
      </div>
    </div>
  );
}
