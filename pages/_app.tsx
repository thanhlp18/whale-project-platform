// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/editor.css";
import StoreProvider from "@/redux/storeProvider";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/lib/client/context/authContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#f76f12",
            },
          }}
        >
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </ConfigProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
