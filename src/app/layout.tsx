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
  manifest: "/manifest.json",
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  icons: [
    { rel: "apple-touch-icon", url: "/MoodHubOGP.png" },
    { rel: "icon", url: "/MoodHubOGP.png" },
  ],
  appleWebApp: {
    capable: true,
    title: "MoodHub | みんなの曲を共有・検索",
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: "tuHWtjEYbjbvRhV8m_pXuitDzeuzodNAcge9xkNjPa8",
  },
  openGraph: {
    type: "website",
    title: "MoodHub | みんなの曲を共有・検索",
    description:
      "カラオケやパーティーでの音楽の選択に悩むことはもうありません。MoodHubでルームを作成し、参加者の知っている曲を瞬時に検索。一緒の時間をもっと楽しく、もっと盛り上げましょう。",
    siteName: "MoodHub | みんなの曲を共有・検索",
    images: [
      {
        url: "/MoodHubOGP.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodHub | みんなの曲を共有・検索",
    description:
      "カラオケやパーティーでの音楽の選択に悩むことはもうありません。MoodHubでルームを作成し、参加者の知っている曲を瞬時に検索。一緒の時間をもっと楽しく、もっと盛り上げましょう。",
    images: "/MoodHubOGP.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${zenkakugothicnew.className} bg-background dark:bg-darkbackground text-font dark:text-darkfont`}
      >
        <AuthProvider>
          <ApolloWrapper>
            <ChakraProvider>
              <Header />
              <main className="h-[calc(100dvh-5rem)]">
                <div className="md:max-w-[60%] max-w-[90%] m-auto">
                  {children}
                </div>
              </main>
            </ChakraProvider>
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
