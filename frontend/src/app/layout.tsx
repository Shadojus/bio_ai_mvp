// /frontend/src/app/layout.tsx

import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Bio-AI Dashboard",
  description: "A unified system for biometric and AI integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
