import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/motion/interactions";
import { CartSheet } from "@/components/order/cart-sheet";
import { SiteProviders } from "@/components/providers/site-providers";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteProviders>
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <CartSheet />
    </SiteProviders>
  );
}
