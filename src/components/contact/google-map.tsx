"use client";

import { ExternalLink, MapPin, Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

interface GoogleMapProps {
  className?: string;
  /** Height of the map frame in CSS units. */
  height?: string;
}

/**
 * Embeds Google Maps for the restaurant location.
 *
 * Uses the standard embed iframe — no API key required. If
 * `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set, swap to the Maps Embed API for
 * richer styling without changing any page code.
 */
export function GoogleMap({ className, height = "28rem" }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { lat, lng } = CONTACT.geo;

  const embedSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(CONTACT.mapQuery)}&zoom=16`
    : `https://maps.google.com/maps?q=${lat},${lng}&z=16&hl=en&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT.mapQuery)}`;
  const placeUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`;

  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      <iframe
        title="DZIFOODS location on Google Maps"
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="border-border w-full border"
        style={{ height, minHeight: "18rem" }}
      />

      <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:flex-col sm:items-stretch">
        <Button asChild variant="ember" size="md" uppercase className="shadow-lift">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="size-4" aria-hidden />
            Directions
          </a>
        </Button>
        <Button asChild variant="glass" size="md" className="backdrop-blur-xl">
          <a href={placeUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-4" aria-hidden />
            Open in Maps
          </a>
        </Button>
      </div>

      <p className="sr-only">
        <MapPin aria-hidden className="size-4" />
        {CONTACT.address.street}, {CONTACT.address.district}, {CONTACT.address.city}
      </p>
    </div>
  );
}
