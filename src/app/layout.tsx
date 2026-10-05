import type { Metadata } from "next";
import { Poppins, Mulish, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE_NAME, SITE_URL_FALLBACK } from "@/constants/site";
import { THEME_STORAGE_KEY } from "@/constants/storage";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var dark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();`;

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#0E2A42" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL_FALLBACK),
  title: {
    default: `${SITE_NAME}: parametric climate insurance on Stellar`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Mvua Protocol pays smallholder farmers automatically when on chain weather data says the season failed. No claims adjusters, no paperwork.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: `${SITE_NAME}: parametric climate insurance on Stellar`,
    description:
      "Farmers get paid automatically when on chain weather data says the season failed.",
    url: SITE_URL_FALLBACK,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${mulish.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* The site ships its own light/dark theme, so tell the Dark Reader
            extension to stand down instead of re-coloring the sand palette
            into brown. Dark Reader honors this lock tag. */}
        <meta name="darkreader-lock" content="" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-bg-elevated focus:px-6 focus:py-3 focus:text-sm focus:font-bold focus:shadow-neu-raised"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <div id="main-content" className="w-full max-w-full min-w-0 overflow-x-clip">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
