import {
  Accessibility,
  BadgeCheck,
  CircleDollarSign,
  ScanLine,
  Sparkles,
  UsersRound,
  type LucideIcon
} from "lucide-react";

export type WhyChooseIconName = "family" | "certified" | "digital" | "pricing" | "hygiene" | "access";

const icons: Record<WhyChooseIconName, LucideIcon> = {
  family: UsersRound,
  certified: BadgeCheck,
  digital: ScanLine,
  pricing: CircleDollarSign,
  hygiene: Sparkles,
  access: Accessibility
};

export function WhyChooseIcon({name}: {name: WhyChooseIconName}) {
  const Icon = icons[name];

  return <Icon className="why-choose-icon-path" aria-hidden="true" />;
}
