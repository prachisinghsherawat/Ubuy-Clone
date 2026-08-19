import type { ThemeConfig } from "antd";

/** Brand palette. Mirrored as CSS variables in globals.css for plain elements. */
export const brand = {
  plum: "#4a2743",
  plumDeep: "#331a2e",
  coral: "#ff6a3d",
  amber: "#ffb43d",
  mint: "#17b98a",
  ink: "#33262e",
  muted: "#7c6b75",
  line: "#f2e6e4",
  surface: "#ffffff",
  canvas: "#fff6f1",
} as const;

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: brand.coral,
    colorInfo: brand.plum,
    colorSuccess: brand.mint,
    colorLink: brand.plum,
    colorTextBase: brand.ink,
    colorBgLayout: brand.canvas,
    borderRadius: 16,
    fontSize: 17,
    fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
    controlHeight: 46,
    wireframe: false,
  },
  components: {
    Button: {
      fontWeight: 650,
      borderRadius: 999,
      borderRadiusLG: 999,
      borderRadiusSM: 999,
      paddingInline: 22,
      paddingInlineLG: 30,
      primaryShadow: "none",
      defaultShadow: "none",
      controlHeightLG: 48,
    },
    Card: {
      paddingLG: 20,
      headerFontSize: 18,
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
      paddingBlock: 10,
      borderRadius: 14,
    },
    Menu: {
      itemBorderRadius: 12,
      itemHeight: 40,
    },
    Steps: {
      colorPrimary: brand.coral,
    },
    Tag: {
      borderRadiusSM: 999,
      defaultBg: "#fff1ea",
    },
    Table: {
      headerBg: "#fff3ec",
    },
  },
};
