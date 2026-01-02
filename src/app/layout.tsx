import type { Metadata } from "next";
// import Footer from "@/components/Footer";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import { ThemeProvider } from '@/components/ThemeProvider';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Thinksolv",
  description: "Building Solutions Thoughtfully",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YGZPCFS806"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];   
                  function gtag(){dataLayer.push(arguments);}   
                  gtag('js', new Date());   
                  gtag('config', 'G-YGZPCFS806');
               `,
          }}
        />
        {/* Clarity Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(c, l, a, r, i, t, y) {
                  c[a] = c[a] || function() {
                    (c[a].q = c[a].q || []).push(arguments);
                  };
                  t = l.createElement(r);
                  t.async = 1;
                  t.src = "https://www.clarity.ms/tag/" + i;
                  y = l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t, y);
                })(window, document, "clarity", "script", "p5nd8jtocs");
              `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RecaptchaProvider>
            {children}
          </RecaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
