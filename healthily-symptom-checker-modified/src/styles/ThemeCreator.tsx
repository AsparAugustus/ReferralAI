import { ThemeProvider } from "styled-components";
import { baseTheme } from "./baseTheme";

export const ThemeCreator: React.FC<{
  children: React.ReactNode;
  query: { [key: string]: string };
}> = ({ query, children }) => {
  if (!query) {
    return <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>;
  }

  const primaryColor = query.primaryColor;

  const theme = primaryColor
    ? { ...baseTheme, primaryColor: `#${primaryColor}` }
    : baseTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
