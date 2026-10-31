import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

const NAV_LINKS: ReadonlyArray<{ label: string; to: string }> = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const EMAIL = "sadik.agaria.barch14@gmail.com";
const PHONE_DISPLAY = "9714139299";
const ADDRESS_LINE_1 = "420 Bauhaus Lane, Suite 300, Design";
const ADDRESS_LINE_2 = "District, NY 10013";
const TAGLINE =
  "Quiet, sculptural architecture shaped by context, light, and material honesty.";
const AVAILABILITY_TEXT = "Open to new commissions";

const STUDIOS: ReadonlyArray<{ city: string; zone: string }> = [
  { city: "Kyoto", zone: "Asia/Tokyo" },
  { city: "New York", zone: "America/New_York" },
  { city: "Zurich", zone: "Europe/Zurich" },
];

function LocalTime({ zone }: { zone: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: zone,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [zone]);

  return <span className="studio-time">{time}</span>;
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="footer-copy" onClick={onCopy} aria-live="polite">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function SiteFooter() {
  const containerRef = useReveal<HTMLDivElement>();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container reveal" ref={containerRef}>
        <div className="footer-grid">
          <div className="footer-col footer-brand-col">
            <h3 className="footer-brand">SADIK AGARIA ARCHITECTS</h3>
            <p className="footer-tagline">{TAGLINE}</p>
            <span className="footer-status">
              <span className="footer-status-dot" aria-hidden="true" />
              {AVAILABILITY_TEXT}
            </span>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-list">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h4 className="footer-heading">CONTACT</h4>
            <address className="footer-address">
              {ADDRESS_LINE_1}
              <br />
              {ADDRESS_LINE_2}
            </address>
            <div className="footer-email-row">
              <a href={`mailto:${EMAIL}`} className="footer-link footer-email">
                {EMAIL}
              </a>
              <CopyEmail email={EMAIL} />
            </div>
            <a href={`tel:${PHONE_DISPLAY}`} className="footer-link footer-phone">
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">STUDIOS</h4>
            <ul className="footer-list footer-studios">
              {STUDIOS.map((studio) => (
                <li key={studio.city} className="studio-row">
                  <span className="studio-city">{studio.city}</span>
                  <LocalTime zone={studio.zone} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy-text">
            © {year} Sadik Agaria Architects. All rights reserved.
          </p>
          <button type="button" className="footer-top" onClick={scrollToTop}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
