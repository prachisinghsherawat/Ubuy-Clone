"use client";

import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, App, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth, type SignUpInput } from "@/features/auth/AuthProvider";
import { useAuthRedirect } from "@/features/auth/useAuthRedirect";
import { ROUTES } from "@/lib/constants";

interface SignUpValues extends SignUpInput {
  confirm: string;
  terms: boolean;
}

export function SignUpForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { message } = App.useApp();
  const destination = useAuthRedirect(ROUTES.home);
  const [error, setError] = useState<string | null>(null);

  const submit = (values: SignUpValues) => {
    const result = signUp({
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
    });

    if (!result.ok) {
      setError(result.error ?? "Could not create your account.");
      return;
    }
    setError(null);
    message.success(`Welcome to Ubuy, ${values.name.split(" ")[0]}`);
    router.push(destination);
  };

  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 700 }}>Create account</h1>
      <p style={{ margin: "0 0 24px", color: "var(--ink-muted)" }}>
        Already registered?{" "}
        <Link href={ROUTES.signIn} style={{ color: "var(--brand-orange)", fontWeight: 600 }}>
          Sign in
        </Link>
      </p>

      {error ? (
        <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
      ) : null}

      <Form<SignUpValues> layout="vertical" requiredMark={false} onFinish={submit}>
        <Form.Item
          name="name"
          label="Full name"
          rules={[{ required: true, message: "Enter your name" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Priya Sharma"
            autoComplete="name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Enter your email" },
            { type: "email", message: "That does not look like a valid email" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile number"
          rules={[
            { required: true, message: "Enter your mobile number" },
            { pattern: /^[6-9]\d{9}$/, message: "Enter a 10-digit Indian mobile number" },
          ]}
        >
          <Input
            size="large"
            prefix={<MobileOutlined />}
            addonBefore="+91"
            maxLength={10}
            placeholder="9876543210"
            autoComplete="tel-national"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Choose a password" },
            { min: 8, message: "Use at least 8 characters" },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Re-enter your password" },
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                !value || value === getFieldValue("password")
                  ? Promise.resolve()
                  : Promise.reject(new Error("The two passwords do not match")),
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value: boolean) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please accept the terms to continue")),
            },
          ]}
        >
          <Checkbox>
            I agree to the terms of service and privacy policy
          </Checkbox>
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit" block>
          Create account
        </Button>
      </Form>

      <p style={{ margin: "18px 0 0", fontSize: 12.5, color: "var(--ink-muted)", lineHeight: 1.7 }}>
        This is a demo build with no server: your details are kept in this browser&apos;s
        local storage, so never enter a password you use elsewhere.
      </p>
    </>
  );
}
