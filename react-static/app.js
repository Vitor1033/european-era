(function () {
  const { useEffect, useMemo, useRef, useState } = React;
  const html = htm.bind(React.createElement);

  function useHashRoute() {
    const getRoute = () => window.location.hash.replace("#", "") || "/home";
    const [route, setRoute] = useState(getRoute);
    useEffect(() => {
      const onChange = () => setRoute(getRoute());
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    }, []);
    return [route, (next) => (window.location.hash = next)];
  }

  function useLocale() {
    const [locale, setLocale] = useState(function () {
      const saved = localStorage.getItem("ee_locale");
      if (saved === "en" || saved === "pt" || saved === "es") return saved;
      const lang = (navigator.language || "en").slice(0, 2).toLowerCase();
      return lang === "pt" || lang === "es" ? lang : "en";
    });
    useEffect(() => {
      localStorage.setItem("ee_locale", locale);
      document.documentElement.lang = locale;
    }, [locale]);
    return [locale, setLocale];
  }

  function LanguageSwitcher(props) {
    const { locale, setLocale, t } = props;
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const labels = useMemo(
      () => ({
        en: window.EE_CONTENT.locales.en.languageName,
        pt: window.EE_CONTENT.locales.pt.languageName,
        es: window.EE_CONTENT.locales.es.languageName,
      }),
      [],
    );

    useEffect(() => {
      const onDoc = (e) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return html`
      <div className="lang" ref=${ref}>
        <button
          className="btn"
          type="button"
          aria-haspopup="menu"
          aria-expanded=${open}
          onClick=${() => setOpen(!open)}
          title=${t.ui.changeLanguage}
        >
          🌐
          <span style=${{ fontWeight: 900 }}>${labels[locale]}</span>
        </button>
        ${open
          ? html`<div className="lang-menu" role="menu" aria-label=${t.ui.changeLanguage}>
              ${["en", "pt", "es"].map(
                (loc) => html`
                  <button
                    key=${loc}
                    type="button"
                    role="menuitemradio"
                    aria-current=${loc === locale ? "true" : "false"}
                    onClick=${() => {
                      setLocale(loc);
                      setOpen(false);
                    }}
                  >
                    ${labels[loc]}
                  </button>
                `,
              )}
            </div>`
          : null}
      </div>
    `;
  }

  function Nav(props) {
    const { t, locale, setLocale, route, setRoute } = props;
    const items = [
      ["/opportunities", t.nav.opportunities],
      ["/services", t.nav.services],
      ["/partners", t.nav.partners],
      ["/about", t.nav.about],
      ["/blog", t.nav.blog],
      ["/faq", t.nav.faq],
    ];
    return html`
      <header className="nav">
        <div className="container">
          <div className="nav-inner">
            <a
              href="#/home"
              className="brand"
              onClick=${(e) => {
                e.preventDefault();
                setRoute("/home");
              }}
            >
              <span className="brand-mark">EE</span>
              <span>European Era</span>
            </a>
            <nav className="nav-links" aria-label="Primary">
              ${items.map(
                (it) => html`
                  <a
                    key=${it[0]}
                    href=${"#" + it[0]}
                    aria-current=${route === it[0] ? "page" : undefined}
                    onClick=${(e) => {
                      e.preventDefault();
                      setRoute(it[0]);
                    }}
                  >
                    ${it[1]}
                  </a>
                `,
              )}
            </nav>
            <div className="nav-actions">
              <${LanguageSwitcher} locale=${locale} setLocale=${setLocale} t=${t} />
              <button className="btn btn-primary" type="button" onClick=${() => setRoute("/contact")}>
                ${t.nav.contact}
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function SectionHeader(props) {
    return html`
      <div>
        ${props.eyebrow ? html`<div className="eyebrow">${props.eyebrow}</div>` : null}
        <h2 className="h2">${props.title}</h2>
        ${props.subtitle ? html`<p className="sub">${props.subtitle}</p>` : null}
      </div>
    `;
  }

  function Home(props) {
    const { t, setRoute } = props;
    return html`
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="pill">${t.hero.eyebrow}</span>
              <h1 className="h1">${t.hero.title}</h1>
              <p className="lead">${t.hero.subtitle}</p>
              <div style=${{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick=${() => setRoute("/opportunities")}>${t.hero.cta1}</button>
                <button className="btn" onClick=${() => setRoute("/partners")}>${t.hero.cta2}</button>
              </div>
              <div className="trust-grid" style=${{ marginTop: 18 }}>
                ${t.hero.trust.map((x) => html`<div key=${x} className="trust-card">${x}</div>`)}
              </div>
            </div>
            <div className="hero-visual">
              <div style=${{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style=${{ fontSize: 12, color: "var(--mutedText)", fontWeight: 800 }}>Mobility dashboard</div>
                  <div style=${{ fontSize: 14, fontWeight: 900 }}>Your European pipeline</div>
                </div>
                <span style=${{
                  border: "1px solid var(--border)",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontWeight: 900,
                  color: "var(--primary)",
                  fontSize: 12,
                }}>Live</span>
              </div>
              <div className="visual-grid">
                ${[
                  { k: "Applications", v: "12", t: "+3 this week" },
                  { k: "Matches", v: "86%", t: "Strong fit" },
                  { k: "Destinations", v: "5", t: "EU-wide" },
                  { k: "Next step", v: "Berlin", t: "Interview" },
                ].map((r) => html`
                  <div key=${r.k} className="mini">
                    <div className="k">${r.k}</div>
                    <div className="v">${r.v}</div>
                    <div className="t">${r.t}</div>
                  </div>
                `)}
              </div>
              <div className="progress">
                <div style=${{ fontWeight: 900 }}>Guided checklist · visas · housing intro</div>
                <div className="bar"><div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function SimplePage(props) {
    return html`
      <div className="container" style=${{ padding: "44px 0" }}>
        <h1 className="h1" style=${{ fontSize: 40, marginTop: 0 }}>${props.title}</h1>
        ${props.paragraphs
          ? html`<div style=${{ marginTop: 14 }}>
              ${props.paragraphs.map(
                (p, i) =>
                  html`<p key=${i} className="lead" style=${{
                    fontSize: 16,
                    maxWidth: "76ch",
                  }}>
                    ${p}
                  </p>`,
              )}
            </div>`
          : null}
        ${props.children}
      </div>
    `;
  }

  function Contact(props) {
    const t = props.t;
    const [status, setStatus] = useState("idle");
    const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
    const onChange = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
    const valid =
      values.name.trim().length >= 2 &&
      values.email.includes("@") &&
      values.subject.trim().length >= 3 &&
      values.message.trim().length >= 10;

    return html`
      <${SimplePage} title=${t.pages.contact.title} paragraphs=${[t.pages.contact.p]}>
        <div className="grid cols2" style=${{ marginTop: 22 }}>
          <div className="card soft">
            <h3 style=${{ margin: 0 }}>Email</h3>
            <p className="hint" style=${{ marginTop: 10 }}>
              hello@european-era.com<br />
              Partnerships & support
            </p>
          </div>
          <div className="card">
            <form
              className="form"
              noValidate
              onSubmit=${(e) => {
                e.preventDefault();
                setStatus(valid ? "success" : "error");
              }}
            >
              <div className="grid cols2" style=${{ gap: 12, marginTop: 0 }}>
                <div className="field">
                  <label htmlFor="name">${t.pages.contact.form.name}</label>
                  <input id="name" value=${values.name} onInput=${onChange("name")} />
                </div>
                <div className="field">
                  <label htmlFor="email">${t.pages.contact.form.email}</label>
                  <input id="email" value=${values.email} onInput=${onChange("email")} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="subject">${t.pages.contact.form.subject}</label>
                <input id="subject" value=${values.subject} onInput=${onChange("subject")} />
              </div>
              <div className="field">
                <label htmlFor="message">${t.pages.contact.form.message}</label>
                <textarea id="message" value=${values.message} onInput=${onChange("message")}></textarea>
              </div>
              ${status === "success" ? html`<div className="status-ok">${t.pages.contact.form.success}</div>` : null}
              ${status === "error" ? html`<div className="status-err">${t.pages.contact.form.error}</div>` : null}
              <button className="btn btn-primary" type="submit">${t.pages.contact.form.submit}</button>
            </form>
          </div>
        </div>
      <//>
    `;
  }

  function App() {
    const [route, setRoute] = useHashRoute();
    const [locale, setLocale] = useLocale();
    const t = window.EE_CONTENT.locales[locale] || window.EE_CONTENT.locales.en;

    let main = null;
    if (route === "/home") main = html`<${Home} t=${t} setRoute=${setRoute} />`;
    else if (route === "/about")
      main = html`<${SimplePage} title=${t.pages.about.title} paragraphs=${t.pages.about.p} />`;
    else if (route === "/opportunities")
      main = html`
        <${SimplePage} title=${t.pages.opportunities.title} paragraphs=${[t.pages.opportunities.p]}>
          <div className="grid cols3">
            ${t.pages.opportunities.items.map(
              (it) => html`<div key=${it.t} className="card"><h3>${it.t}</h3><p>${it.meta}</p></div>`,
            )}
          </div>
        <//>
      `;
    else if (route === "/services")
      main = html`
        <${SimplePage} title=${t.pages.services.title} paragraphs=${[t.pages.services.p]}>
          <div className="grid cols2">
            ${t.pages.services.items.map(
              (it) => html`<div key=${it.t} className="card soft"><h3>${it.t}</h3><p>${it.b}</p></div>`,
            )}
          </div>
        <//>
      `;
    else if (route === "/partners")
      main = html`<${SimplePage} title=${t.pages.partners.title} paragraphs=${[t.pages.partners.p]} />`;
    else if (route === "/blog")
      main = html`
        <${SimplePage} title=${t.pages.blog.title} paragraphs=${[t.pages.blog.p]}>
          <div className="grid cols3">
            ${t.pages.blog.items.map(
              (it) => html`<div key=${it.t} className="card"><h3>${it.t}</h3><p>${it.meta}</p></div>`,
            )}
          </div>
        <//>
      `;
    else if (route === "/faq")
      main = html`
        <${SimplePage} title=${t.pages.faq.title} paragraphs=${[t.pages.faq.p]}>
          <div className="grid">
            ${t.pages.faq.items.map(
              (it) => html`<div key=${it.q} className="card"><h3>${it.q}</h3><p>${it.a}</p></div>`,
            )}
          </div>
        <//>
      `;
    else if (route === "/contact") main = html`<${Contact} t=${t} />`;
    else if (route === "/privacy")
      main = html`<${SimplePage} title=${t.pages.privacy.title} paragraphs=${t.pages.privacy.p} />`;
    else if (route === "/terms")
      main = html`<${SimplePage} title=${t.pages.terms.title} paragraphs=${t.pages.terms.p} />`;
    else main = html`<${Home} t=${t} setRoute=${setRoute} />`;

    return html`
      <${Nav}
        t=${t}
        locale=${locale}
        setLocale=${setLocale}
        route=${route}
        setRoute=${setRoute}
      />
      <main id="main">${main}</main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand" style=${{ marginTop: 10 }}>
                <span className="brand-mark">EE</span>
                <span>European Era</span>
              </div>
              <p className="hint" style=${{ marginTop: 10 }}>${t.footer.tagline}</p>
            </div>
            <div>
              <div style=${{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mutedText)" }}>Product</div>
              <div style=${{ marginTop: 10, display: "grid", gap: 10 }}>
                <a href="#/opportunities">${t.nav.opportunities}</a>
                <a href="#/services">${t.nav.services}</a>
                <a href="#/partners">${t.nav.partners}</a>
                <a href="#/blog">${t.nav.blog}</a>
              </div>
            </div>
            <div>
              <div style=${{ fontSize: 12, fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mutedText)" }}>Legal</div>
              <div style=${{ marginTop: 10, display: "grid", gap: 10 }}>
                <a href="#/privacy">${t.nav.privacy}</a>
                <a href="#/terms">${t.nav.terms}</a>
                <a href="#/contact">${t.nav.contact}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bottom">© ${new Date().getFullYear()} European Era. ${t.footer.rights}</div>
      </footer>
    `;
  }

  try {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(html`<${App} />`);
  } catch (err) {
    const el = document.getElementById("root");
    el.innerHTML =
      "<div style='padding:24px;font-family:Inter,sans-serif'><h2>Erro ao carregar</h2><p>" +
      String(err) +
      "</p><p>Verifica ligação à internet (CDN React/HTM).</p></div>";
  }
})();

