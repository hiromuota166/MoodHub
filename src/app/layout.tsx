import "./globals.css";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import Header from "@/components/Header";
import { ApolloWrapper } from "@/lib/apollo-provider";
import React from "react";

const zenkakugothicnew = Zen_Kaku_Gothic_New({
  weight: "400",
  subsets: ["latin"],
});
import { AuthProvider } from "@/context/auth";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "MoodHub | みんなの曲を共有・検索",
  description:
    "カラオケやパーティーでの音楽の選択に悩むことはもうありません。MoodHubでルームを作成し、参加者の知っている曲を瞬時に検索。一緒の時間をもっと楽しく、もっと盛り上げましょう。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${zenkakugothicnew.className} bg-background`}>
        <AuthProvider>
          <ApolloWrapper>
            <ChakraProvider>
              <Header />
              <main className='min-h-screen md:max-w-[60%] max-w-[90%] m-auto p-12"'>
                {children}
              </main>
            </ChakraProvider>
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
