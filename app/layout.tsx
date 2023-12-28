import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "./layout/Header";
import { Web3Modal } from "./components/connectwallet/Web3Modal";
import { ReduxProvider } from "./state/provider";
import ClientApplication from "./components/ClientApplication";

export const metadata: Metadata = {
  title: "Portfolio X",
  description: "Analytics tool for the Function X ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <ThemeRegistry>
        <Web3Modal>
          <ReduxProvider>
            <ClientApplication>
              <body>
                {children}
                
                <Header />
              </body>
              </ClientApplication>
            
          </ReduxProvider>
        </Web3Modal>
      </ThemeRegistry>
    </html>
  );
}
