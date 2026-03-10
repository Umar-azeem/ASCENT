import { Navbar } from "@/components/navbar";
import { TopMarquee } from "@/components/top-marquee";
import { Toaster } from "sonner";
import Script from "next/script";
import { Footer } from "@/components/footer"; 
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next"; 



const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Ascent Garment - Fashion for Everyone",
  description: "Premium fashion collection for Men and Kids",
  generator: "umar.dev",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Ascent Garment - Fashion for Everyone</title>
        <meta
          name="description"
          content="Premium fashion collection for Men and Kids"
        />
      </head>
      <body className={inter.className}>
        {/* Pixel Script */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}
(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '517991158551582');
fbq('track', 'PageView');
`,
          }}
        />

        <div className="min-h-screen flex flex-col">
          <TopMarquee />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </div>
      </body>
    </html>
  );
}
