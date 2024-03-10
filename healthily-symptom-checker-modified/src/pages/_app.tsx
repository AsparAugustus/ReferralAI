import type { AppProps } from "next/app";
import { ThemeCreator } from "@styles/ThemeCreator";
import ErrorBoundary from "@/components/Error";
import { Poppins, Libre_Franklin } from "next/font/google";

import GlobalStyle from "@/styles/globalstyles";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const LibreFranklinFont = Libre_Franklin({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const { query } = pageProps;

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeCreator query={query}>
        <GlobalStyle />
        <ErrorBoundary>
          <main
            className={`${LibreFranklinFont.className} ${PoppinsFont.className}`}
          >
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
            />
            <Component {...pageProps} />
          </main>
        </ErrorBoundary>
      </ThemeCreator>
    </StyleSheetManager>
  );
}
