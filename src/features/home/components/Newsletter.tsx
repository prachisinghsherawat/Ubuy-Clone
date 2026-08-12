"use client";

import { MailOutlined } from "@ant-design/icons";
import { App, Button, Form, Input } from "antd";

interface NewsletterValues {
  email: string;
}

export function Newsletter() {
  const [form] = Form.useForm<NewsletterValues>();
  const { message } = App.useApp();

  const handleFinish = ({ email }: NewsletterValues) => {
    // No mailing-list backend in this clone — acknowledge and reset.
    message.success(`${email} is on the list. Watch your inbox for deals.`);
    form.resetFields();
  };

  return (
    <section
      className="surface-card"
      style={{
        display: "grid",
        gap: 20,
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 1fr)",
        alignItems: "center",
        padding: "32px clamp(20px, 4vw, 40px)",
      }}
    >
      <div>
        <h2 className="section-title">Stay updated</h2>
        <p className="section-subtitle" style={{ maxWidth: "52ch" }}>
          Get price drops, restock alerts and members-only coupons. One email a week,
          no filler.
        </p>
      </div>

      <Form form={form} onFinish={handleFinish} layout="inline" style={{ gap: 8 }}>
        <Form.Item
          name="email"
          style={{ flex: 1, marginInlineEnd: 0 }}
          rules={[
            { required: true, message: "Enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item style={{ marginInlineEnd: 0 }}>
          <Button type="primary" size="large" htmlType="submit">
            Subscribe
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
