import "./globals.css";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import Header from "@/components/Header";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { Providers } from "./providers";
import { AuthProvider } from "@/context/auth";

const zenkakugothicnew = Zen_Kaku_Gothic_New({
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${zenkakugothicnew.className}`}>
				<AuthProvider>
					<ApolloWrapper>
						<Providers>
							<Header />
							<main className='min-h-screen   bg-background dark:bg-darkbackground dark:text-darkfont'>
								<div className='md:max-w-[60%] max-w-[90%] m-auto p-12'>{children}</div>
							</main>
						</Providers>
					</ApolloWrapper>
				</AuthProvider>
			</body>
		</html>
	);
}
