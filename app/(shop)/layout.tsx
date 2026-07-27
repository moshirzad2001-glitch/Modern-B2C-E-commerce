import { cn } from "@/lib/utils";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Header/>
      <main className="min-h-full flex font-mono flex-col intialiased">{children}</main>
    <Footer/>
    </>
  );
}
