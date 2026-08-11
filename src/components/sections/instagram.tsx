import { Heart, MessageCircle } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section";
import { INSTAGRAM_POSTS } from "@/constants/content";
import { SOCIALS } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Instagram grid.
 *
 * Currently reads from the content layer; wiring the Graph API later only means
 * replacing `INSTAGRAM_POSTS` with a cached fetch of the same shape.
 */
export function InstagramFeed({ className }: { className?: string }) {
  const instagram = SOCIALS.find((social) => social.label === "Instagram")!;

  return (
    <section className={cn("section bg-surface/40", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="@dzifoods"
            title="Follow the fire."
            description="Tag us and you might end up on the wall by the pass. It has happened more than once."
            align="center"
            action={
              <Button asChild variant="outline" size="lg" uppercase>
                <a href={instagram.href} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="size-4" />
                  Follow {instagram.handle}
                </a>
              </Button>
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6" gap={0.06}>
          {INSTAGRAM_POSTS.map((post) => (
            <StaggerItem key={post.id}>
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus-visible:outline-ring relative block overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <ImageFrame
                  src={post.image}
                  alt={post.caption}
                  ratio="square"
                  rounded={false}
                  zoom
                  sizes="(max-width: 768px) 50vw, 220px"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <span className="flex items-center gap-4 text-xs font-medium text-white">
                    <span className="flex items-center gap-1.5">
                      <Heart className="size-3.5 fill-white" />
                      {post.likes.toLocaleString("en-US")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="size-3.5" />
                      {post.comments}
                    </span>
                  </span>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
