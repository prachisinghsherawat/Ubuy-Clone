"use client";

import { Mail, Send } from "lucide-react";
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
    <section className="newsletter reveal">
      <div className="newsletter-copy">
        <span className="newsletter-kicker">
          <Mail /> Weekly drop
        </span>
        <h2>Get the price drops before they sell out</h2>
        <p>
          Restock alerts, members-only coupons and the week&apos;s biggest cuts.
          One email a week, no filler.
        </p>
      </div>

      <div>
        <Form
          form={form}
          onFinish={handleFinish}
          layout="inline"
          className="newsletter-form"
          // The default inline layout wraps each item at a fixed width; the
          // flex row set in CSS needs the items to size from their content.
          style={{ flexWrap: "nowrap" }}
        >
          <Form.Item
            name="email"
            style={{ flex: 1, marginInlineEnd: 0 }}
            rules={[
              { required: true, message: "Enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<Mail />}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item style={{ marginInlineEnd: 0 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<Send />}
              iconPlacement="end"
            >
              Subscribe
            </Button>
          </Form.Item>
        </Form>

        <p className="newsletter-note">
          No spam. Unsubscribe in one click, any time.
        </p>
      </div>
    </section>
  );
}
