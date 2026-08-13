"use client";

import {
  AppstoreOutlined,
  BgColorsOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  CrownOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  GiftOutlined,
  HeartOutlined,
  HomeOutlined,
  LaptopOutlined,
  ManOutlined,
  MobileOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SkinOutlined,
  SmileOutlined,
  StarOutlined,
  TabletOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

/** Maps the `icon` key on a Category to a rendered antd icon. */
export const CATEGORY_ICONS: Record<string, ReactNode> = {
  smile: <SmileOutlined />,
  experiment: <ExperimentOutlined />,
  home: <HomeOutlined />,
  cart: <ShoppingCartOutlined />,
  decor: <BgColorsOutlined />,
  coffee: <CoffeeOutlined />,
  laptop: <LaptopOutlined />,
  man: <ManOutlined />,
  shopping: <ShoppingOutlined />,
  clock: <ClockCircleOutlined />,
  thunderbolt: <ThunderboltOutlined />,
  dashboard: <DashboardOutlined />,
  heart: <HeartOutlined />,
  mobile: <MobileOutlined />,
  trophy: <TrophyOutlined />,
  eye: <EyeOutlined />,
  tablet: <TabletOutlined />,
  skin: <SkinOutlined />,
  car: <CarOutlined />,
  gift: <GiftOutlined />,
  woman: <WomanOutlined />,
  crown: <CrownOutlined />,
  star: <StarOutlined />,
  fieldTime: <FieldTimeOutlined />,
  appstore: <AppstoreOutlined />,
};

export function categoryIcon(key: string): ReactNode {
  return CATEGORY_ICONS[key] ?? CATEGORY_ICONS.appstore;
}
