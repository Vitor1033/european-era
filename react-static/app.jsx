const { useEffect, useMemo, useRef, useState } = React;

function useHashRoute() {
  const getRoute = () => {
    const raw = window.location.hash.replace("#", "");
    return raw ? raw : "/home";
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return [route, (next) => (window.location.hash = next)];
}

function useLocale() {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem("ee_locale");
    if (saved === "en" || saved === "pt" || saved === "es") return saved;
    const lang = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (lang === "pt" || lang === "es") return lang;
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("ee_locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return [locale, setLocale];
}

function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm7.93 9h-3.18a15.3 15.3 0 0 0-1.2-5.02A8.02 8.02 0 0 1 19.93 11ZM12 4c.95 0 2.37 2.05 3.03 7H8.97C9.63 6.05 11.05 4 12 4ZM4.07 13h3.18c.16 1.78.6 3.52 1.2 5.02A8.02 8.02 0 0 1 4.07 13Zm3.18-2H4.07a8.02 8.02 0 0 1 4.38-5.02A15.3 15.3 0 0 0 7.25 11Zm1.72 2h5.06c-.66 4.95-2.08 7-3.03 7s-2.37-2.05-3.03-7Zm6.36 5.02c.6-1.5 1.04-3.24 1.2-5.02h3.18a8.02 8.02 0 0 1-4.38 5.02Z"
      />
    </svg>
  );
}

function LanguageSwitcher({ locale, setLocale, labels, t }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="lang" ref={wrapRef}>
      <button
        className="btn"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title={t.ui.changeLanguage}
      >
        <IconGlobe />
        <span className="sr-only">{t.ui.changeLanguage}</span>
        <span style={{ fontWeight: 900 }}>{labels[locale]}</span>
      </button>
      {open ? (
        <div className="lang-menu" role="menu" aria-label={t.ui.changeLanguage}>
          {["en", "pt", "es"].map((loc) => (
            <button
              key={loc}
              role="menuitemradio"
              aria-checked={loc === locale}
              aria-current={loc === locale ? "true" : "false"}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              type="button"
            >
              {labels[loc]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Nav({ locale, setLocale, t, route, setRoute }) {
  const labels = useMemo(
    () => ({
      en: window.EE_CONTENT.locales.en.languageName,
      pt: window.EE_CONTENT.locales.pt.languageName,
      es: window.EE_CONTENT.locales.es.languageName,
    }),
    [],
  );

  const navItems = [
    ["/home", t.nav.home],
    ["/opportunities", t.nav.opportunities],
    ["/services", t.nav.services],
    ["/partners", t.nav.partners],
    ["/about", t.nav.about],
    ["/blog", t.nav.blog],
    ["/faq", t.nav.faq],
    ["/contact", t.nav.contact],
  ];

  return (
    <header className="nav">
      <div className="container">
        <div className="nav-inner">
          <a
            href="#/home"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              setRoute("/home");
            }}
          >
            <span className="brand-mark">EE</span>
            <span>European Era</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {navItems.slice(1, 7).map(([href, label]) => (
              <a
                key={href}
                href={`#${href}`}
                aria-current={route === href ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setRoute(href);
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageSwitcher
              locale={locale}
              setLocale={setLocale}
              labels={labels}
              t={t}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setRoute("/contact")}
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2 className="h2">{title}</h2>
      {subtitle ? <p className="sub">{subtitle}</p> : null}
    </div>
  );
}

function Home({ t, setRoute }) {
  const s = t.sections;
  return (
    <>
      <section className="hero" aria-label="Hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="pill">{t.hero.eyebrow}</span>
              <h1 className="h1">{t.hero.title}</h1>
              <p className="lead">{t.hero.subtitle}</p>
              <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => setRoute("/opportunities")}>
                  {t.hero.cta1}
                </button>
                <button className="btn" onClick={() => setRoute("/partners")}>
                  {t.hero.cta2}
                </button>
              </div>
              <div className="trust-grid" style={{ marginTop: 18 }}>
                {t.hero.trust.map((x) => (
                  <div key={x} className="trust-card">
                    {x}
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual" aria-label="Dashboard visual">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--mutedText)", fontWeight: 800 }}>
                    Mobility dashboard
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 900 }}>Your European pipeline</div>
                </div>
                <span
                  style={{
                    border: "1px solid var(--border)",
                    background: "rgba(255,255,255,.8)",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontWeight: 900,
                    color: "var(--primary)",
                    fontSize: 12,
                  }}
                >
                  Live
                </span>
              </div>
              <div className="visual-grid">
                {[
                  { k: "Applications", v: "12", t: "+3 this week" },
                  { k: "Matches", v: "86%", t: "Strong fit" },
                  { k: "Destinations", v: "5", t: "EU-wide" },
                  { k: "Next step", v: "Berlin", t: "Interview" },
                ].map((r) => (
                  <div className="mini" key={r.k}>
                    <div className="k">{r.k}</div>
                    <div className="v">{r.v}</div>
                    <div className="t">{r.t}</div>
                  </div>
                ))}
              </div>
              <div className="progress">
                <div style={{ fontWeight: 900 }}>Guided checklist · visas · housing intro</div>
                <div className="bar" aria-hidden="true">
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Stats">
        <div className="container">
          <SectionHeader eyebrow={s.stats.eyebrow} title={s.stats.title} />
          <div className="grid cols3">
            {s.stats.items.map((it) => (
              <div key={it.l} className="card soft">
                <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.03em" }}>{it.v}</div>
                <div style={{ marginTop: 8, color: "var(--mutedText)", fontWeight: 800 }}>{it.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" aria-label="How it works">
        <div className="container">
          <SectionHeader eyebrow={s.how.eyebrow} title={s.how.title} />
          <div className="grid cols2">
            {s.how.items.map((it, idx) => (
              <div key={it.t} className="card">
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 14,
                      background: "#fff",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      color: "var(--primary)",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{it.t}</h3>
                    <p style={{ marginTop: 10 }}>{it.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Why us">
        <div className="container">
          <SectionHeader eyebrow={s.why.eyebrow} title={s.why.title} />
          <div className="grid cols2">
            {s.why.items.map((it) => (
              <div key={it.t} className="card">
                <h3>{it.t}</h3>
                <p>{it.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Final CTA">
        <div className="container">
          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 40%, #1d4ed8 100%)",
              color: "#fff",
              borderColor: "rgba(255,255,255,.12)",
              boxShadow: "var(--shadowCard)",
              padding: 26,
            }}
          >
            <h2 className="h2" style={{ color: "#fff", marginTop: 0 }}>
              {s.cta.title}
            </h2>
            <p className="sub" style={{ color: "rgba(226,232,240,.9)" }}>
              {s.cta.subtitle}
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn" style={{ background: "#fff", borderColor: "transparent" }} onClick={() => setRoute("/opportunities")}>
                {s.cta.primary}
              </button>
              <button className="btn" style={{ background: "rgba(255,255,255,.10)", color: "#fff", borderColor: "rgba(255,255,255,.28)" }} onClick={() => setRoute("/partners")}>
                {s.cta.secondary}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SimplePage({ title, paragraphs, children }) {
  return (
    <div className="container" style={{ padding: "44px 0" }}>
      <h1 className="h1" style={{ fontSize: 40, marginTop: 0 }}>
        {title}
      </h1>
      {paragraphs ? (
        <div style={{ marginTop: 14 }}>
          {paragraphs.map((p, i) => (
            <p key={i} className="lead" style={{ fontSize: 16, maxWidth: "76ch" }}>
              {p}
            </p>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function Contact({ t }) {
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });

  const onChange = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    if (values.name.trim().length < 2) return false;
    if (!values.email.includes("@")) return false;
    if (values.subject.trim().length < 3) return false;
    if (values.message.trim().length < 10) return false;
    return true;
  };

  return (
    <SimplePage title={t.pages.contact.title} paragraphs={[t.pages.contact.p]}>
      <div className="grid cols2" style={{ marginTop: 22 }}>
        <div className="card soft">
          <h3 style={{ margin: 0 }}>Email</h3>
          <p className="hint" style={{ marginTop: 10 }}>
            hello@european-era.com
            <br />
            Partnerships & support
          </p>
        </div>
        <div className="card">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!validate()) {
                setStatus("error");
                return;
              }
              setStatus("success");
            }}
            noValidate
          >
            <div className="grid cols2" style={{ gap: 12, marginTop: 0 }}>
              <div className="field">
                <label htmlFor="name">{t.pages.contact.form.name}</label>
                <input id="name" value={values.name} onChange={onChange("name")} />
              </div>
              <div className="field">
                <label htmlFor="email">{t.pages.contact.form.email}</label>
                <input id="email" value={values.email} onChange={onChange("email")} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="subject">{t.pages.contact.form.subject}</label>
              <input id="subject" value={values.subject} onChange={onChange("subject")} />
            </div>
            <div className="field">
              <label htmlFor="message">{t.pages.contact.form.message}</label>
              <textarea id="message" value={values.message} onChange={onChange("message")} />
            </div>
            {status === "success" ? (
              <div className="status-ok" role="status">
                {t.pages.contact.form.success}
              </div>
            ) : null}
            {status === "error" ? (
              <div className="status-err" role="alert">
                {t.pages.contact.form.error}
              </div>
            ) : null}
            <button className="btn btn-primary" type="submit">
              {t.pages.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </SimplePage>
  );
}

function App() {
  const [route, setRoute] = useHashRoute();
  const [locale, setLocale] = useLocale();

  const t = window.EE_CONTENT.locales[locale] || window.EE_CONTENT.locales.en;

  const main = (() => {
    switch (route) {
      case "/home":
        return <Home t={t} setRoute={setRoute} />;
      case "/about":
        return <SimplePage title={t.pages.about.title} paragraphs={t.pages.about.p} />;
      case "/opportunities":
        return (
          <SimplePage title={t.pages.opportunities.title} paragraphs={[t.pages.opportunities.p]}>
            <div className="grid cols3">
              {t.pages.opportunities.items.map((it) => (
                <div key={it.t} className="card">
                  <h3>{it.t}</h3>
                  <p>{it.meta}</p>
                </div>
              ))}
            </div>
          </SimplePage>
        );
      case "/services":
        return (
          <SimplePage title={t.pages.services.title} paragraphs={[t.pages.services.p]}>
            <div className="grid cols2">
              {t.pages.services.items.map((it) => (
                <div key={it.t} className="card soft">
                  <h3>{it.t}</h3>
                  <p>{it.b}</p>
                </div>
              ))}
            </div>
          </SimplePage>
        );
      case "/partners":
        return <SimplePage title={t.pages.partners.title} paragraphs={[t.pages.partners.p]} />;
      case "/blog":
        return (
          <SimplePage title={t.pages.blog.title} paragraphs={[t.pages.blog.p]}>
            <div className="grid cols3">
              {t.pages.blog.items.map((it) => (
                <div key={it.t} className="card">
                  <h3>{it.t}</h3>
                  <p>{it.meta}</p>
                </div>
              ))}
            </div>
          </SimplePage>
        );
      case "/faq":
        return (
          <SimplePage title={t.pages.faq.title} paragraphs={[t.pages.faq.p]}>
            <div className="grid">
              {t.pages.faq.items.map((it) => (
                <div key={it.q} className="card">
                  <h3>{it.q}</h3>
                  <p>{it.a}</p>
                </div>
              ))}
            </div>
          </SimplePage>
        );
      case "/contact":
        return <Contact t={t} />;
      case "/privacy":
        return <SimplePage title={t.pages.privacy.title} paragraphs={t.pages.privacy.p} />;
      case "/terms":
        return <SimplePage title={t.pages.terms.title} paragraphs={t.pages.terms.p} />;
      default:
        return <Home t={t} setRoute={setRoute} />;
    }
  })();

  return (
    <>
      <Nav locale={locale} setLocale={setLocale} t={t} route={route} setRoute={setRoute} />
      <main id="main">{main}</main>
      <footer className="footer" aria-label="Footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand" style={{ marginTop: 10 }}>
                <span className="brand-mark">EE</span>
                <span>European Era</span>
              </div>
              <p className="hint" style={{ marginTop: 10 }}>
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mutedText)" }}>
                {t.nav.home}
              </div>
              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                <a href="#/opportunities">{t.nav.opportunities}</a>
                <a href="#/services">{t.nav.services}</a>
                <a href="#/partners">{t.nav.partners}</a>
                <a href="#/blog">{t.nav.blog}</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mutedText)" }}>
                Legal
              </div>
              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                <a href="#/privacy">{t.nav.privacy}</a>
                <a href="#/terms">{t.nav.terms}</a>
                <a href="#/contact">{t.nav.contact}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bottom">© {new Date().getFullYear()} European Era. {t.footer.rights}</div>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

