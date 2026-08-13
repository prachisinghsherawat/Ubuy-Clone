import type { ThemeConfig } from "antd";

/** Brand palette. Mirrored as CSS variables in globals.css for plain elements. */
export const brand = {
  navy: "#0f2540",
  navyDeep: "#0a1b2e",
  orange: "#e2571f",
  amber: "#ffb100",
  mint: "#0f9d76",
  ink: "#1a2434",
  muted: "#63707f",
  line: "#e6eaef",
  surface: "#ffffff",
  canvas: "#f5f7fa",
} as const;

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: brand.orange,
    colorInfo: brand.navy,
    colorSuccess: brand.mint,
    colorLink: brand.navy,
    colorTextBase: brand.ink,
    colorBgLayout: brand.canvas,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    controlHeight: 40,
    wireframe: false,
  },
  components: {
    Button: {
      fontWeight: 600,
      primaryShadow: "none",
      defaultShadow: "none",
      controlHeightLG: 48,
    },
    Card: {
      paddingLG: 20,
      headerFontSize: 16,
    },
    // Hero carousel chrome. Sizing and offsets are real design tokens in antd 6,
    // so they belong here rather than in a stylesheet override; globals.css only
    // adds the parts that are not tokenised (the glass arrow disc, dot colours).
    Carousel: {
      arrowSize: 40,
      arrowOffset: 24,
      dotWidth: 26,
      dotHeight: 4,
      dotActiveWidth: 44,
      dotGap: 8,
      dotOffset: 28,
    },
    Input: {
      paddingBlock: 8,
    },
    Menu: {
      itemBorderRadius: 8,
      itemHeight: 40,
    },
    Steps: {
      colorPrimary: brand.orange,
    },
    Tag: {
      borderRadiusSM: 6,
    },
    Table: {
      headerBg: "#f7f9fb",
    },
  },
};
