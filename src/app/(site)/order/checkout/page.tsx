import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { CheckoutForm } from "@/components/order/checkout-form";
import { ORDER_SETTINGS } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your DZIFOODS order — delivery or collection, mobile money, card or cash.",
  path: "/order/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40">
      <div className="container-luxe">
        <nav aria-label="Breadcrumb">
          <ol className="font-ui text-muted-foreground flex flex-wrap items-center gap-1.5 text-[0.7rem] tracking-[0.14em] uppercase">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="size-3 opacity-50" aria-hidden />
              <Link href="/order" className="hover:text-foreground transition-colors">
                Order
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="size-3 opacity-50" aria-hidden />
              <span aria-current="page" className="text-gold">
                Checkout
              </span>
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl leading-[1.05] font-medium md:text-6xl">
            Almost yours.
          </h1>
          <p className="text-muted-foreground mt-5 text-base leading-relaxed md:text-lg">
            Four short steps. Nothing is charged until you confirm, and you can amend the order for
            five minutes after placing it — {ORDER_SETTINGS.deliveryEstimate} for delivery,{" "}
            {ORDER_SETTINGS.pickupEstimate} to collect.
          </p>
        </header>

        <div className="mt-14">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
