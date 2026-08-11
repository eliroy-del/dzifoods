import { Check, Minus } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section";
import { COMPARISON } from "@/constants/content";
import { cn } from "@/lib/utils";

/**
 * Comparison table. A real <table> so the relationship between rows and columns
 * survives assistive technology, with the mobile view collapsing into cards.
 */
export function WhyChoose({ className }: { className?: string }) {
  return (
    <section className={cn("section relative overflow-hidden", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Why DZIFOODS"
            title="Affordable luxury is a claim. Here is the receipt."
            description="A plain comparison against how most fine dining rooms operate. We are happy to be held to it."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <div className="border-border bg-surface/40 overflow-hidden rounded-3xl border">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                DZIFOODS compared with typical fine dining practice
              </caption>
              <thead>
                <tr className="border-border border-b">
                  <th scope="col" className="p-5 md:p-6">
                    <span className="font-ui text-muted-foreground text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
                      What matters
                    </span>
                  </th>
                  <th scope="col" className="p-5 md:p-6">
                    <Badge variant="ember" size="md">
                      {COMPARISON.columns[0]}
                    </Badge>
                  </th>
                  <th scope="col" className="hidden p-5 md:table-cell md:p-6">
                    <span className="font-ui text-muted-foreground text-[0.7rem] tracking-[0.14em] uppercase">
                      {COMPARISON.columns[1]}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-border/70 hover:bg-accent/4 border-b transition-colors last:border-b-0"
                  >
                    <th scope="row" className="p-5 align-top md:p-6">
                      <span className="font-display text-lg font-normal">{row.label}</span>
                    </th>
                    <td className="p-5 align-top md:p-6">
                      <span className="flex gap-2.5 text-sm">
                        <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden />
                        <span>{row.us}</span>
                      </span>
                      <span className="text-muted-foreground mt-3 flex gap-2.5 text-xs md:hidden">
                        <Minus className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                        <span>{row.them}</span>
                      </span>
                    </td>
                    <td className="text-muted-foreground hidden p-5 align-top text-sm md:table-cell md:p-6">
                      <span className="flex gap-2.5">
                        <Minus className="mt-0.5 size-4 shrink-0" aria-hidden />
                        <span>{row.them}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3" gap={0.08}>
          {[
            { value: "No cover charge", detail: "Service included on every bill." },
            { value: "One sitting per table", detail: "The evening is yours, not a slot." },
            { value: "Free cake corkage", detail: "Bring it — we will plate it properly." },
          ].map((item) => (
            <StaggerItem
              key={item.value}
              className="border-border bg-surface/40 rounded-2xl border p-5 text-center"
            >
              <p className="font-ui text-accent text-sm font-semibold">{item.value}</p>
              <p className="text-muted-foreground mt-1.5 text-xs">{item.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
