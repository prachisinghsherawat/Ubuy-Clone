"use client";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, App, Button, Checkbox, Divider, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/features/auth/AuthProvider";
import { useAuthRedirect } from "@/features/auth/useAuthRedirect";
import { ROUTES } from "@/lib/constants";

interface SignInValues {
  email: string;
  password: string;
}

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { message } = App.useApp();
  const destination = useAuthRedirect(ROUTES.home);
  const [error, setError] = useState<string | null>(null);

  const submit = (values: SignInValues) => {
    const result = signIn(values.email, values.password);
    if (!result.ok) {
      setError(result.error ?? "Could not sign you in.");
      return;
    }
    setError(null);
    message.success("Welcome back");
    router.push(destination);
  };

  return (
    <>
      <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 700 }}>Sign in</h1>
      <p style={{ margin: "0 0 24px", color: "var(--ink-muted)" }}>
        New here?{" "}
        <Link href={ROUTES.signUp} style={{ color: "var(--brand-coral)", fontWeight: 600 }}>
          Create an account
        </Link>
      </p>

      {error ? (
        <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
      ) : null}

      <Form<SignInValues> layout="vertical" requiredMark={false} onFinish={submit}>
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
          name="password"
          label="Password"
          rules={[{ required: true, message: "Enter your password" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <Checkbox defaultChecked>Keep me signed in</Checkbox>
          <Link href="#" style={{ fontSize: 13, color: "var(--brand-coral)" }}>
            Forgot password?
          </Link>
        </div>

        <Button type="primary" size="large" htmlType="submit" block>
          Sign in
        </Button>
      </Form>

      <Divider plain style={{ color: "var(--ink-subtle)", fontSize: 12 }}>
        demo build
      </Divider>

      <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-muted)", lineHeight: 1.7 }}>
        Accounts are stored in this browser only — there is no server behind this form, so
        create an account here first, and never use a real password.
      </p>
    </>
  );
}
