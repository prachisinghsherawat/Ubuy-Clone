import {
  CameraOutlined,
  DesktopOutlined,
  HomeOutlined,
  LaptopOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  SoundOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

/** Maps the `icon` key on a Category to a rendered antd icon. */
export const CATEGORY_ICONS: Record<string, ReactNode> = {
  playSquare: <PlayCircleOutlined />,
  sound: <SoundOutlined />,
  rocket: <RocketOutlined />,
  desktop: <DesktopOutlined />,
  laptop: <LaptopOutlined />,
  camera: <CameraOutlined />,
  home: <HomeOutlined />,
  thunderbolt: <ThunderboltOutlined />,
};

export function categoryIcon(key: string): ReactNode {
  return CATEGORY_ICONS[key] ?? <ThunderboltOutlined />;
}
