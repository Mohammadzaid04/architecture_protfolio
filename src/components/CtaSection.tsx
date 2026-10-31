import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";

const CONTACT_PATH = "/contact";
const EMAIL = "sadik.agaria.barch14@gmail.com";
const PHONE_DISPLAY = "9714139299";

export default function CtaSection() {
  const innerRef = useReveal<HTMLDivElement>();

  return (
    <section className="cta" aria-labelledby="cta-heading">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-grid" aria-hidden="true" />
      <div className="cta-inner reveal" ref={innerRef}>
        <p className="cta-eyebrow">START A DIALOGUE</p>
        <h2 className="cta-title" id="cta-heading">
          Let Us Shape Your Next Spatial Landmark
        </h2>
        <p className="cta-sub">
          Share the site, the programme and the ambition. We will take it from there.
        </p>
        <Link to={CONTACT_PATH} className="cta-button">
          <span>Initiate a Conversation</span>
          <span className="cta-arrow" aria-hidden="true">→</span>
        </Link>
        <div className="cta-contact">
          <a href={`mailto:${EMAIL}`} className="cta-contact-link">
            {EMAIL}
          </a>
          <span className="cta-dot" aria-hidden="true" />
          <a href={`tel:${PHONE_DISPLAY}`} className="cta-contact-link">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

export { CtaSection };
