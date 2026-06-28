import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Payments", href: "#products" },
      { label: "Payouts", href: "#products" },
      { label: "Billing", href: "#products" },
      { label: "Issuing", href: "#products" },
      { label: "Capital", href: "#products" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#developers" },
      { label: "API reference", href: "#developers" },
      { label: "SDKs", href: "#developers" },
      { label: "Status", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Support", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com/relay" },
  { label: "GitHub", href: "https://github.com/relay" },
  { label: "LinkedIn", href: "https://linkedin.com/company/relay" },
];

export function Footer() {
  return (
    <footer className="section border-t border-default bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-primary">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              Payments, payouts, and compliance for Japanese businesses
              expanding globally.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-medium text-primary">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-default pt-8 text-sm text-secondary sm:flex-row">
          <p>© {new Date().getFullYear()} Relay, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
