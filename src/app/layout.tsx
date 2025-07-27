import type { Metadata } from "next"; 
import { AntdRegistry } from "@ant-design/nextjs-registry"; 
import "./globals.css"; 
import { Poppins } from "next/font/google"; 

const poppins = Poppins({ weight: ['400', '500', '600', '700','800'], subsets: ['latin'] });



export const metadata: Metadata = {
  title: "Tweet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased  ${poppins.className} `}
      >
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
