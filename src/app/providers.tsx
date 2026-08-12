"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntdApp, ConfigProvider } from "antd";
import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/AuthProvider";
import { CartProvider } from "@/features/cart/CartProvider";
import { WishlistProvider } from "@/features/wishlist/WishlistProvider";
import { themeConfig } from "@/theme/themeConfig";

/**
 * Single mount point for every client-side provider.
 *
 * AntdRegistry collects antd's CSS-in-JS on the server so the first paint is
 * already styled; AntdApp supplies the context that `message` and `modal` hooks
 * need anywhere below it.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={themeConfig}>
        <AntdApp>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>{children}</CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  );
}
