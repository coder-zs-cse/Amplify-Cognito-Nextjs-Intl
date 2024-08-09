import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Toaster />
            <ConfigureAmplifyClientSide />
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
