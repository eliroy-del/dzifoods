"use client";

import { useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { FAQS } from "@/constants/gallery";
import type { FaqItem } from "@/types";

const TOPICS = ["All", "Reservations", "Dining", "Orders & Delivery", "Events", "Gift Cards"] as const;

type FaqTopic = (typeof TOPICS)[number];

interface FaqListProps {
  items?: readonly FaqItem[];
  /** Show topic filter chips above the accordion. */
  showFilter?: boolean;
}

export function FaqList({ items = FAQS, showFilter = true }: FaqListProps) {
  const [topic, setTopic] = useState<FaqTopic>("All");

  const filtered = useMemo(
    () => (topic === "All" ? items : items.filter((item) => item.topic === topic)),
    [items, topic],
  );

  return (
    <div>
      {showFilter ? (
        <ToggleGroup
          type="single"
          value={topic}
          onValueChange={(next) => next && setTopic(next as FaqTopic)}
          className="hide-scrollbar mask-fade-x mb-8 w-full flex-wrap justify-start overflow-x-auto"
          aria-label="Filter questions by topic"
        >
          {TOPICS.map((entry) => (
            <ToggleGroupItem key={entry} value={entry} className="shrink-0">
              {entry}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : null}

      <Accordion type="single" collapsible className="w-full">
        {filtered.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
