"use client";

import { useState } from "react";

import { DishCard } from "@/components/menu/dish-card";
import { Reveal } from "@/components/motion/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DISHES, MENU_CATEGORIES } from "@/constants/menu";
import { cn } from "@/lib/utils";
import type { MenuCategoryId } from "@/types";

/** Categories surfaced on the home page — the full list lives on /menu. */
const PREVIEW_CATEGORIES: readonly MenuCategoryId[] = [
  "starters",
  "seafood",
  "steak",
  "local",
  "pasta",
  "desserts",
  "cocktails",
];

export function MenuPreview({ className }: { className?: string }) {
  const [active, setActive] = useState<MenuCategoryId>("starters");

  return (
    <section id="menu-preview" className={cn("section relative", className)}>
      <div className="container-luxe">
        <Tabs
          value={active}
          onValueChange={(value) => setActive(value as MenuCategoryId)}
        >
          <Reveal>
            <TabsList aria-label="Menu categories" className="pb-2">
              {PREVIEW_CATEGORIES.map((id) => {
                const category = MENU_CATEGORIES.find((entry) => entry.id === id)!;
                return (
                  <TabsTrigger key={id} value={id}>
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Reveal>

          {PREVIEW_CATEGORIES.map((id) => {
            const category = MENU_CATEGORIES.find((entry) => entry.id === id)!;
            const dishes = DISHES.filter((dish) => dish.category === id).slice(0, 3);

            return (
              <TabsContent key={id} value={id} className="mt-10">
                <p className="font-display text-muted-foreground mb-8 text-xl italic">
                  {category.tagline}
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {dishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
