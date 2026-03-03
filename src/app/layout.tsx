import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRFPE ATHENA",
  description: "Middleware de Protesto"
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="pt-BR">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}