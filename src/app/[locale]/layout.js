import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <Toaster />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

// import Navbar from "@/components/navbar/Navbar";
// import "./globals.css";
// export default async function LocaleLayout({ children, params: { locale } }) {
//   // Providing all messages to the client
//   // side is the easiest way to get started

//   return (
//     <html lang={locale}>
//       <body>
//           <Navbar />
//           {children}
//       </body>
//     </html>
//   );
// }
