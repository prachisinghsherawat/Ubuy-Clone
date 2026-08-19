"use client";

import {
  BankOutlined,
  CreditCardOutlined,
  DollarOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Alert, App, Button, Form, Input, Radio, Skeleton, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/features/cart/CartProvider";
import { OrderSummary } from "@/features/cart/OrderSummary";
import { addressStore, lastOrderStore } from "@/features/checkout/checkoutStores";
import { CheckoutSteps } from "@/features/checkout/CheckoutSteps";
import { EmptyCartNotice } from "@/features/checkout/EmptyCartNotice";
import { ROUTES } from "@/lib/constants";
import { maskCardNumber } from "@/lib/format";
import { usePersistentValue } from "@/lib/persistentStore";
import type { PaymentMethod } from "@/types";

interface PaymentForm {
  method: PaymentMethod;
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  upiId?: string;
}

/** Groups digits into blocks of four as the shopper types. */
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

/** Rejects malformed or already-expired MM/YY input. */
function validateExpiry(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(value ?? "");
  if (!match) return false;

  const month = Number(match[1]);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiry = new Date(2000 + Number(match[2]), month, 0);
  return expiry >= new Date(now.getFullYear(), now.getMonth(), 1);
}

export default function PaymentPage() {
  const router = useRouter();
  const { lines, totals, hydrated, clearCart } = useCart();
  const address = usePersistentValue(addressStore);
  const { message } = App.useApp();

  const [form] = Form.useForm<PaymentForm>();
  // Which fields to show is driven by the form's own state rather than a
  // parallel useState, so the two can never disagree.
  const method: PaymentMethod = Form.useWatch("method", form) ?? "card";

  // Placing the order empties the cart, which would otherwise re-render this
  // page as "nothing to check out" before the redirect lands.
  const [placing, setPlacing] = useState(false);

  const placeOrder = (values: PaymentForm) => {
    setPlacing(true);

    lastOrderStore.set({
      id: `UB${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      lines,
      totals,
      address: address!,
      paymentMethod: values.method,
      cardLast4:
        values.method === "card" ? maskCardNumber(values.cardNumber ?? "") : "",
    });

    clearCart();
    message.success("Payment successful");
    router.replace(ROUTES.success);
  };

  if (!hydrated) {
    return (
      <div className="container page">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!placing && lines.length === 0) {
    return (
      <div className="container page">
        <CheckoutSteps current={1} />
        <EmptyCartNotice />
      </div>
    );
  }

  if (!address) {
    return (
      <div className="container page">
        <CheckoutSteps current={1} />
        <div className="surface-card empty-state">
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            We need a delivery address before you can pay.
          </p>
          <Link href={ROUTES.checkout}>
            <Button type="primary" size="large">
              Add a shipping address
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <CheckoutSteps current={1} />

      <div className="checkout-grid">
        <div className="surface-card" style={{ padding: 24 }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>Payment</h1>
          <p style={{ margin: "0 0 16px", color: "var(--ink-muted)", fontSize: 14 }}>
            Delivering to <strong>{address.fullName}</strong>, {address.addressLine},{" "}
            {address.city}, {address.state} {address.pincode}{" "}
            <Link href={ROUTES.checkout} style={{ color: "var(--brand-coral)" }}>
              Change
            </Link>
          </p>

          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: 20 }}
            message="Demo checkout"
            description="No payment is taken and no card details leave this page — they are never stored or sent anywhere. Use any test values."
          />

          <Form<PaymentForm>
            form={form}
            layout="vertical"
            requiredMark="optional"
            initialValues={{ method: "card" }}
            onFinish={placeOrder}
          >
            <Form.Item name="method" label="Payment method">
              <Radio.Group style={{ display: "grid", gap: 10 }}>
                <Radio value="card">
                  <CreditCardOutlined /> Credit or debit card
                </Radio>
                <Radio value="upi">
                  <BankOutlined /> UPI
                </Radio>
                <Radio value="cod">
                  <DollarOutlined /> Cash on delivery
                </Radio>
              </Radio.Group>
            </Form.Item>

            {method === "card" ? (
              <>
                <Form.Item
                  name="cardName"
                  label="Name on card"
                  rules={[{ required: true, message: "Enter the name printed on the card" }]}
                >
                  <Input size="large" placeholder="PRIYA SHARMA" autoComplete="cc-name" />
                </Form.Item>

                <Form.Item
                  name="cardNumber"
                  label="Card number"
                  normalize={formatCardNumber}
                  rules={[
                    { required: true, message: "Enter a card number" },
                    {
                      validator: (_, value: string) =>
                        (value ?? "").replace(/\s/g, "").length === 16
                          ? Promise.resolve()
                          : Promise.reject(new Error("Card numbers are 16 digits")),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    autoComplete="cc-number"
                    suffix={<LockOutlined style={{ color: "var(--ink-subtle)" }} />}
                  />
                </Form.Item>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Form.Item
                    name="expiry"
                    label="Expiry (MM/YY)"
                    normalize={formatExpiry}
                    rules={[
                      { required: true, message: "Enter the expiry date" },
                      {
                        validator: (_, value: string) =>
                          validateExpiry(value)
                            ? Promise.resolve()
                            : Promise.reject(new Error("Enter a valid future date")),
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      inputMode="numeric"
                      placeholder="09/28"
                      autoComplete="cc-exp"
                    />
                  </Form.Item>

                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[
                      { required: true, message: "Enter the CVV" },
                      { pattern: /^\d{3,4}$/, message: "CVVs are 3 or 4 digits" },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      maxLength={4}
                      inputMode="numeric"
                      autoComplete="cc-csc"
                    />
                  </Form.Item>
                </div>
              </>
            ) : null}

            {method === "upi" ? (
              <Form.Item
                name="upiId"
                label="UPI ID"
                rules={[
                  { required: true, message: "Enter your UPI ID" },
                  {
                    pattern: /^[\w.-]{2,}@[a-zA-Z]{2,}$/,
                    message: "UPI IDs look like name@bank",
                  },
                ]}
              >
                <Input size="large" placeholder="priya@okbank" />
              </Form.Item>
            ) : null}

            {method === "cod" ? (
              <Typography.Paragraph type="secondary">
                Pay in cash when your order arrives. Please keep the exact amount ready —
                the courier may not carry change.
              </Typography.Paragraph>
            ) : null}

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<LockOutlined />}
                loading={placing}
              >
                Place order
              </Button>
              <Link href={ROUTES.checkout}>
                <Button type="link">Back to address</Button>
              </Link>
            </div>
          </Form>
        </div>

        <OrderSummary totals={totals} title="Paying now" showShippingMeter={false} />
      </div>
    </div>
  );
}
