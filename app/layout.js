import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import BottomNav from "@/components/BottomNav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Analytics = () => null;
import { AuthProvider } from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://cmnty-anime.vercel.app'),
  applicationName: "cmnty anime",
  title: "cmnty anime : Stream Anime Free Without Those Annoying Ads",
  icons: {
    icon: '/images/logo.png',
  },
  description: "Welcome to cmnty anime, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality. Enjoy a seamless viewing experience with zero interruptions, and explore new titles every day. At cmnty anime, your anime adventure awaits!",
  keywords: [
    'anime',
    'cmnty anime',
    'trending anime',
    'watch anime subbed',
    'watch anime dubbed',
    'latest anime episodes',
    'anime streaming',
    'anime schedule',
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "cmnty anime : Stream Anime Free Without Those Annoying Ads",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "cmnty anime",
    title: "cmnty anime : Stream Anime Free Without Those Annoying Ads",
    description: "Welcome to cmnty anime, your ultimate destination for streaming anime free of charge and without any annoying ads. Dive into a vast collection of your favorite anime series and movies, all available in high quality.",
  },
  twitter: {
    card: "summary",
    title: "cmnty anime : Stream Anime Free Without Those Annoying Ads",
    description: "Welcome to cmnty anime, your ultimate destination for streaming anime free of charge and without any annoying ads.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <div className="w-full overflow-x-hidden min-h-screen relative">
            {children}
          </div>
          {/* <Footer /> */}
          <BottomNav />
        </AuthProvider>

        <Analytics />
        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
