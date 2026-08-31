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
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-3 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center gap-2.5 lg:justify-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="text-lg font-bold">
              Flick<span className="text-accent">Tv</span>
            </span>
          </div>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted lg:mx-0">
            Live TV, sports, movies, and series — one subscription, every screen.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:contents">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 grid gap-y-2 text-sm text-muted">
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
            <ul className="mt-3 space-y-2.5 text-sm text-muted">
              <li className="flex min-w-0 items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="break-words">{siteConfig.location}</span>
              </li>
              <li className="flex min-w-0 items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="break-words">{siteConfig.whatsappDisplay}</span>
              </li>
              <li className="flex min-w-0 items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="break-words">{siteConfig.email}</span>
              </li>
              <li className="break-words pl-6">{siteConfig.supportHours}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
