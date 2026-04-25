/* App component — Portfolio site */
const { useState, useEffect, useRef, useMemo } = React;

const D = window.PORTFOLIO_DATA;

/* ----------------------------------------------------------
   Nav
---------------------------------------------------------- */
function Nav({ active }) {
  const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "works", label: "Works" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" }
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="nav-brand-mark">RK</span>
          <span>Róbert Kovács</span>
        </div>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ----------------------------------------------------------
   Hero
---------------------------------------------------------- */
function Hero() {
  return (
    <section id="hero" className="hero container">
      <div className="hero-eyebrow">
        <span className="dot"></span>
        <span>Available for selected engagements · Cluj-Napoca, RO</span>
      </div>

      <div className="hero-name-row">
        <h1 className="hero-name">
          Róbert<br/>
          Kovács<span className="accent">.</span>
        </h1>
      </div>

      <div className="hero-role">
        <span>Requirements Engineer</span>
        <span className="sep">/</span>
        <span>Project Lead</span>
        <span className="sep">/</span>
        <span>ex-Software Engineer</span>
      </div>
      <p className="hero-manifesto">
        I turn fuzzy requirements into <strong>well-defined, planned and executed value packages</strong>.
        Started as an engineer, now I lead the full arc — from clarifying what to build, to staffing the
        team, to landing it on time and on budget.
      </p>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">7<span className="unit">yrs</span></div>
          <div className="hero-stat-label">In the trade</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">€400<span className="unit">k+</span></div>
          <div className="hero-stat-label">Per contract delivered</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">15</div>
          <div className="hero-stat-label">Engineers onboarded</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">3</div>
          <div className="hero-stat-label">Languages spoken</div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------
   Section header
---------------------------------------------------------- */
function Chapter({ num, title }) {
  return (
    <div className="chapter">
      <span className="chapter-num">CH.{num}</span>
      <span className="chapter-tick"></span>
      <span>{title}</span>
    </div>
  );
}

/* ----------------------------------------------------------
   About
---------------------------------------------------------- */
function About() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="container">
      <Chapter num="01" title="About / Profile" />
      <div className="about-grid">
        <div>
          <p className="about-lead">
            Initially started as a Software Engineer, my passion lies in solving problems through
            well-defined, planned and executed value packages for diverse customers.
          </p>
          <div className="about-body">
            <p>
              My experience spans detailed software engineering, value clarification with requirements
              engineering, and leading individuals and teams through complex challenges. That arc gives
              me deep insight into the obstacles at every stage of a software project — and lets me
              support and drive successful delivery at any level.
            </p>
            <p style={{ marginTop: 18, color: "var(--text-dim)", fontSize: 13, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
              ↳ Off-shift: an avid gamer who min-maxes the math behind the games. Built a few
              computer games in high school. Fascinated by how emotions take over rationality — and
              by the dynamics of betting markets. Has never placed a bet.
            </p>
          </div>

          <div ref={ref} className="statblock" style={{ marginTop: 32 }}>
            <div className="statblock-title">
              <span>Operator profile</span>
              <span className="id">CHAR_001</span>
            </div>
            {D.skills.map((s, i) => (
              <div key={s.name} className="stat-row">
                <span className="stat-name">{s.name}</span>
                <div className="stat-bar">
                  <div
                    className="stat-bar-fill"
                    style={{
                      width: animated ? `${s.value}%` : "0%",
                      transitionDelay: `${i * 80}ms`
                    }}
                  ></div>
                </div>
                <span className="stat-val">{animated ? s.value : 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cards">
          <div className="mini-card">
            <div className="mini-card-title">Soft Skills</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "var(--text-muted)" }}>
              {D.softSkills.map(s => (
                <li key={s} style={{ paddingLeft: 16, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>—</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mini-card">
            <div className="mini-card-title">Languages</div>
            {D.languages.map(l => (
              <div key={l.lang} className="lang-row">
                <span>{l.lang}</span>
                <span className="level">{l.level}</span>
              </div>
            ))}
          </div>

          <div className="mini-card">
            <div className="mini-card-title">Certifications</div>
            {D.certifications.map(c => (
              <div key={c.name} className="cert-item">
                <div>{c.name}</div>
                <div className="meta">{c.meta}</div>
              </div>
            ))}
          </div>

          <div className="mini-card">
            <div className="mini-card-title">Education</div>
            {D.education.map(e => (
              <div key={e.degree} className="edu-item">
                <div className="edu-item-row">
                  <span className="school">{e.school}</span>
                  <span className="years">{e.years}</span>
                </div>
                <div className="degree">{e.degree}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------
   Experience — horizontal scrubber
---------------------------------------------------------- */
function Experience() {
  const roles = D.roles;
  const [idx, setIdx] = useState(roles.length - 1);
  const role = roles[idx];

  const ticks = useMemo(() => {
    // Build ticks dynamically from roles. Each role becomes a tick at its start year.
    // roles is reverse-chronological (roles[0] = newest).
    // We compute the year axis from the earliest role's start year to "Now".
    const startYears = roles.map(r => parseInt(r.year, 10));
    const minYear = Math.min(...startYears);
    const nowYear = new Date().getFullYear() + 1; // a bit of headroom past current year
    const span = nowYear - minYear;

    const roleTicks = roles.map((r, i) => {
      const y = parseInt(r.year, 10);
      return {
        year: y,
        label: String(y),
        roleIdx: i,
        pct: ((y - minYear) / span) * 100
      };
    });

    // De-duplicate ticks that share the same year (multiple roles starting same year)
    // — offset their visual position slightly so labels don't collide.
    // Roles with higher idx are OLDER (left in the timeline display = lower position number),
    // so push them leftward to keep visual order matching position order (1,2,3...).
    const byYear = {};
    roleTicks.forEach(t => {
      byYear[t.year] = (byYear[t.year] || 0) + 1;
    });
    // Iterate roles in REVERSE so the oldest (highest idx) is seen first within a year
    // and gets pushed furthest left.
    const seenCount = {};
    [...roleTicks].reverse().forEach(t => {
      const total = byYear[t.year];
      if (total > 1) {
        seenCount[t.year] = (seenCount[t.year] || 0) + 1;
        // older duplicate → shift LEFT (negative offset)
        const offset = -(seenCount[t.year] - 1) * 1.8;
        t.pct = t.pct + offset;
      }
    });

    // Append the "Now" end-cap marker
    roleTicks.push({
      year: nowYear,
      label: "Now",
      roleIdx: 0,
      marker: true,
      pct: 100
    });

    return roleTicks;
  }, [roles]);

  const activeRoleIdx = idx;
  // Progress fill: extend to NOW when newest role is active, else stop at active role's tick
  const progressPct = activeRoleIdx === 0
    ? 100
    : (ticks.find(t => t.roleIdx === activeRoleIdx && !t.marker)?.pct ?? 0);

  return (
    <section id="experience" className="container">
      <Chapter num="02" title="Experience / Campaign Log" />
      <div className="timeline">
        <div className="timeline-meta">
          <span><span className="company">Cloudflight</span> · Cluj-Napoca · 2019 — Present</span>
          <span>{`${roles.length - idx} / ${roles.length}`}</span>
        </div>

        <div className="scrubber">
          <div
            className="scrubber-track"
            style={{ "--progress": `${progressPct}%` }}
          ></div>
          {ticks.map((t, ti) => {
            // The "Now" marker is a visual end-cap, not a clickable tick
            if (t.marker) {
              return (
                <div
                  key={`now-${t.year}`}
                  className={`scrubber-tick scrubber-tick--marker ${activeRoleIdx === 0 ? "passed" : ""}`}
                  style={{ left: `${t.pct}%` }}
                >
                  <span className="scrubber-tick-dot"></span>
                  <span className="scrubber-tick-label">{t.label}</span>
                </div>
              );
            }
            const isActive = t.roleIdx === activeRoleIdx;
            const passed = t.pct < progressPct;
            return (
              <div
                key={`tick-${ti}-${t.roleIdx}`}
                className={`scrubber-tick ${isActive ? "active" : ""} ${passed && !isActive ? "passed" : ""}`}
                style={{ left: `${t.pct}%` }}
                onClick={() => setIdx(t.roleIdx)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIdx(t.roleIdx); } }}
              >
                <span className="scrubber-tick-role">
                  {roles[t.roleIdx]?.shortRole}
                </span>
                <span className="scrubber-tick-dot"></span>
                <span className="scrubber-tick-label">{t.label}</span>
              </div>
            );
          })}
        </div>

        <div className="scrubber-hint">
          <span className="kbd">click</span> a node or use the <span className="kbd">←</span> <span className="kbd">→</span> arrows to navigate the timeline
        </div>

        <div className="scrubber-controls">
          <button
            className="scrubber-arrow"
            onClick={() => setIdx(Math.min(roles.length - 1, idx + 1))}
            disabled={idx === roles.length - 1}
            aria-label="Earlier role (move left on timeline)"
          >←</button>
          <span className="scrubber-counter">
            <span className="current">{role.label}</span>
            {"  ·  "}
            <span>{role.shortRole}</span>
          </span>
          <button
            className="scrubber-arrow"
            onClick={() => setIdx(Math.max(0, idx - 1))}
            disabled={idx === 0}
            aria-label="More recent role (move right on timeline)"
          >→</button>
        </div>

        <div className="role-panel" key={idx}>
          <div className="role-panel-side">
            <span className="role-panel-period">{role.label}</span>
            <span className="role-panel-context">{role.context}</span>
            <h3 className="role-panel-title">{role.role}</h3>
            <div className="role-panel-tags">
              {role.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <div className="role-panel-body">
            {role.blocks.map(b => (
              <div key={b.title}>
                <div className="role-block-title">{b.title}</div>
                <ul className="role-list">
                  {b.items.map((it, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------
   Works
---------------------------------------------------------- */
function Works() {
  const [filter, setFilter] = useState("all");
  const works = D.works || [];
  const types = ["all", "design", "game", "web"];
  const filtered = filter === "all" ? works : works.filter(w => w.type === filter);

  return (
    <section id="works" className="container">
      <Chapter num="03" title="Personal Works / Side Quests" />

      <div className="works-controls">
        <div className="works-filters">
          {types.map(t => (
            <button
              key={t}
              className={`filter-btn ${filter === t ? "active" : ""}`}
              onClick={() => setFilter(t)}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
        <span className="filter-count">
          {filtered.length > 0 ? `${filtered.length} item${filtered.length === 1 ? "" : "s"}` : "no items yet"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="works-grid">
          {[0, 1, 2].map(i => (
            <div key={i} className="empty-slot">
              <div className="empty-slot-text">
                <span className="accent">[ slot {String(i + 1).padStart(2, "0")} ]</span><br/>
                Reserved for design, game,<br/>or web project
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="works-grid">
          {filtered.map(w => (
            <div key={w.title} className="work-card">
              <div className="work-card-thumb">
                <span className="work-card-thumb-label">[ thumbnail ]</span>
              </div>
              <div className="work-card-body">
                <h3 className="work-card-title">{w.title}</h3>
                <p className="work-card-desc">{w.desc}</p>
                <div className="work-card-meta">
                  <span className="work-card-type">{w.type}</span>
                  <span className="work-card-year">{w.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ----------------------------------------------------------
   Services
---------------------------------------------------------- */
function Services() {
  const services = [
    {
      num: "S.01",
      title: "Requirements Engineering",
      desc: "Turn fuzzy ideas into clear, prioritized work. Stakeholder alignment, refinement, design reviews, and a backlog your team can actually execute against.",
      list: ["Discovery & clarification", "User-story definition", "Backlog structuring", "Design-review facilitation"]
    },
    {
      num: "S.02",
      title: "Project Leadership",
      desc: "Run fixed-price and parallel deliveries end to end. Risk, scope, staffing, and communication — handled, with the customer in the loop and the team focused.",
      list: ["Roadmap & milestones", "Risk & scope management", "Customer communication", "Resource planning"]
    },
    {
      num: "S.03",
      title: "Team Onboarding & Coaching",
      desc: "Bring new teams up to speed fast. Structured technical onboarding, coaching, and the kind of one-on-ones that surface problems before they bite.",
      list: ["Technical onboarding programs", "Scrum facilitation", "Mentoring & one-on-ones", "Process improvement"]
    }
  ];
  return (
    <section id="services" className="container">
      <Chapter num="04" title="Work With Me / Skillset" />
      <div className="services-grid">
        {services.map(s => (
          <div key={s.num} className="service-card">
            <div className="service-card-num">{s.num}</div>
            <h3 className="service-card-title">{s.title}</h3>
            <p className="service-card-desc">{s.desc}</p>
            <ul className="service-card-list">
              {s.list.map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------
   Contact
---------------------------------------------------------- */
function Contact() {
  return (
    <section id="contact" className="container">
      <Chapter num="05" title="Contact / Contact Channels" />
      <div className="contact-block">
        <div>
          <h2 className="contact-headline">
            Have a project that needs <em>clarity</em><br/>and steady delivery?
          </h2>
          <p className="contact-sub">
            Whether you're hiring or scoping a new engagement — drop a line. I read everything that
            isn't a recruiter spam funnel.
          </p>
        </div>
        <div className="contact-side">
          <a className="contact-link" href="mailto:kovacsrobertdot@gmail.com">
            <div>
              <span className="label">Email</span>
              <span className="value">kovacsrobertdot@gmail.com</span>
            </div>
            <span className="arrow">→</span>
          </a>
          <a className="contact-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <div>
              <span className="label">LinkedIn</span>
              <span className="value">/in/róbert-kovács</span>
            </div>
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------
   App
---------------------------------------------------------- */
function App() {
  const [active, setActive] = useState("hero");
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "cyan",
    "theme": "dark",
    "font": "grotesk",
    "hero": "default"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // section observer
  useEffect(() => {
    const ids = ["hero", "about", "experience", "works", "services", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // apply tweak data attrs to root
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.accent = tweaks.accent;
    root.dataset.theme = tweaks.theme;
    root.dataset.font = tweaks.font;
    root.dataset.hero = tweaks.hero;
  }, [tweaks]);

  const navActive = active === "hero" ? "about" : active;

  return (
    <>
      <Nav active={navActive} />
      <Hero />
      <About />
      <Experience />
      <Works />
      <Services />
      <Contact />
      <footer>
        <div className="container footer-inner">
          <span>© 2026 RÓBERT KOVÁCS</span>
          <span>BUILT WITH HTML, COFFEE & MIN-MAX</span>
        </div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={tweaks.theme}
          onChange={v => setTweak("theme", v)}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" }
          ]}
        />
        <TweakRadio
          label="Accent"
          value={tweaks.accent}
          onChange={v => setTweak("accent", v)}
          options={[
            { value: "amber", label: "Amber" },
            { value: "red", label: "Red" },
            { value: "green", label: "Grn" },
            { value: "cyan", label: "Cyan" },
            { value: "violet", label: "Vlt" }
          ]}
        />
        <TweakSection label="Typography" />
        <TweakRadio
          label="Display font"
          value={tweaks.font}
          onChange={v => setTweak("font", v)}
          options={[
            { value: "grotesk", label: "Grotesk" },
            { value: "instrument", label: "Instr." },
            { value: "serif", label: "Fraunces" },
            { value: "mono", label: "Mono" }
          ]}
        />
        <TweakSection label="Layout" />
        <TweakRadio
          label="Hero alignment"
          value={tweaks.hero}
          onChange={v => setTweak("hero", v)}
          options={[
            { value: "default", label: "Left" },
            { value: "centered", label: "Center" }
          ]}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
