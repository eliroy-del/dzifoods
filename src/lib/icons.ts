import {
  Award,
  Baby,
  Banknote,
  Bike,
  Briefcase,
  Cake,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CarFront,
  ChefHat,
  ClipboardList,
  DoorClosed,
  DoorOpen,
  Flame,
  Gift,
  GlassWater,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  IceCream2,
  Leaf,
  MailCheck,
  MapPin,
  Music,
  ShieldCheck,
  Sprout,
  TreePalm,
  Users,
  UtensilsCrossed,
  Wallet,
  Wifi,
  Wine,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files reference icons by name so they stay serialisable (and
 * CMS-friendly). This registry resolves those names to real components while
 * keeping the bundle tree-shakeable — only what is listed here ships.
 */
export const ICONS = {
  Award,
  Baby,
  Banknote,
  Bike,
  Briefcase,
  Cake,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CarFront,
  ChefHat,
  ClipboardList,
  DoorClosed,
  DoorOpen,
  Flame,
  Gift,
  GlassWater,
  GraduationCap,
  Heart,
  HeartHandshake,
  HeartPulse,
  IceCream2,
  Leaf,
  MailCheck,
  MapPin,
  Music,
  ShieldCheck,
  Sprout,
  TreePalm,
  Users,
  UtensilsCrossed,
  Wallet,
  Wifi,
  Wine,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

/** Falls back to a neutral mark so a bad CMS value can never crash a page. */
export function resolveIcon(name: string): LucideIcon {
  return ICONS[name as IconName] ?? Flame;
}
