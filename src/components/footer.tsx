import Link from "next/link";
import { Mail, MapPin, Phone, Play } from "lucide-react";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  ...siteConfig.nav,
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/8 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="text-lg font-bold">
              Flick<span className="text-accent">Tv</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Live TV, sports, movies, and series — one subscription, every screen.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              {siteConfig.location}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              +{siteConfig.whatsappNumber}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              {siteConfig.email}
            </li>
            <li>{siteConfig.supportHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
