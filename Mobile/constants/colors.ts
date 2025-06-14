export const colors = {
  violet: "#6e1d72",
  grey: "#D9D9D9",
  lightGrey: "#ededed",
  darkGrey: "#212121",
  green: "#7dc215",
  grey2: "#898989",
  lightViolet: "#d183d7",
  red: "#ff7961",
} as const;

// Tipos para TypeScript
export type ColorKey = keyof typeof colors;
