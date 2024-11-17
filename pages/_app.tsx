// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/editor.css";
import StoreProvider from "@/redux/storeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
