import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const projects = [
  {
    number: "01",
    name: "StaffTrack",
    eyebrow: "Employee management system",
    description:
      "Employee Management System with staff records, authentication, dashboard, search and role-based access.",
    tags: [
      "React.js",
      "Python Flask",
      "HTML",
      "CSS",
      "SQLite",
    ],
    theme: "violet",
    url: "https://staff-track-peach.vercel.app",
  },

  {
    number: "02",
    name: "HerCare",
    eyebrow: "Health & wellness application",
    description:
      "A smart health companion with period tracking, reminders, PCOD-focused features and backend-connected data.",
    tags: [
      "Flutter",
      "Flask",
      "PostgreSQL",
      "Supabase",
    ],
    theme: "pink",
    url: "https://her-care-ten.vercel.app/",
  },

  {
    number: "03",
    name: "RailGo",
    eyebrow: "Railway ticket system",
    description:
      "Responsive railway ticket booking frontend designed with a simple, clear and user-friendly interface.",
    tags: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
    ],
    theme: "blue",
    url: "https://railway-ticket-system.vercel.app/",
  },

  {
    number: "04",
    name: "LuminaFit",
    eyebrow: "Fitness studio website",
    description:
      "Modern fitness studio website with smooth animations, responsive layouts and interactive sections.",
    tags: [
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    theme: "mint",
    url: "https://luminafit-six.vercel.app/",
  },

  {
    number: "05",
    name: "Ransomware Detection",
    eyebrow: "Cybersecurity + machine learning",
    description:
      "Cloud-based ransomware detection and prevention system using Python, behavioral analysis, machine learning and cloud backups.",
    tags: [
      "Python",
      "Machine Learning",
      "Behavioral Analysis",
      "Cloud Security",
    ],
    theme: "violet",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ProjectPreview({
  theme,
  url,
  ransomware = false,
}: {
  theme: string;
  url?: string;
  ransomware?: boolean;
}) {
  /*
   * RANSOMWARE
   * Old portfolio style preview
   */
  if (ransomware) {
    return (
      <div className="system-preview ransomware-old-preview">
        <div className="system-icon">
          ⌁
        </div>

        <div>
          <strong>
            CLOUD-BASED RANSOMWARE DETECTION
          </strong>

          <small>
            AI / CLOUD SECURITY SYSTEM
          </small>
        </div>
      </div>
    );
  }

  /*
   * LIVE PROJECT
   * Actual website inside the preview box
   */
  const liveUrl = url ?? "";

  const host = liveUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <div
      className={`project-preview preview-${theme} live-project-preview`}
    >
      <div className="browser-bar">
        <span />
        <span />
        <span />

        <b>{host}</b>
      </div>

      <iframe
        src={liveUrl}
        title={`${host} live website`}
        loading="lazy"
        allow="fullscreen"
      />

      <a
        className="live-preview-link"
        href={liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${host}`}
      />

      <span className="live-preview-badge">
        LIVE ↗
      </span>
    </div>
  );
}

export default function App() {
  const progressRef =
    useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileProjectIndex, setMobileProjectIndex] =
    useState<number | null>(0);

  /*
   * SCROLL PROGRESS
   */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        pageHeight > 0
          ? (scrollTop / pageHeight) * 100
          : 0;

      if (progressRef.current) {
        progressRef.current.style.width =
          `${percentage}%`;
      }
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    onScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, []);

  /*
   * CUSTOM CURSOR
   */
  useEffect(() => {
    const cursor =
      document.querySelector<HTMLElement>(
        ".cursor-dot"
      );

    const onMove = (event: MouseEvent) => {
      if (!cursor) return;

      cursor.style.left =
        `${event.clientX}px`;

      cursor.style.top =
        `${event.clientY}px`;
    };

    window.addEventListener(
      "mousemove",
      onMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        onMove
      );
    };
  }, []);

  /*
   * SCROLL REVEAL
   */
  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "show"
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    document
      .querySelectorAll(".reveal")
      .forEach((el) =>
        observer.observe(el)
      );

    return () =>
      observer.disconnect();
  }, []);

  /*
   * ROLE ROTATOR
   */
  useEffect(() => {
    const roles = [
      "FULL STACK DEVELOPER",
      "WEB DEVELOPER",
      "MOBILE DEVELOPER",
    ];

    const roleEl =
      document.getElementById(
        "role-text"
      );

    let roleIndex = 0;

    const timer =
      window.setInterval(() => {
        if (!roleEl) return;

        roleEl.style.opacity = "0";

        roleEl.style.transform =
          "translateY(6px)";

        window.setTimeout(() => {
          roleIndex =
            (roleIndex + 1) %
            roles.length;

          roleEl.textContent =
            roles[roleIndex];

          roleEl.style.opacity = "1";

          roleEl.style.transform =
            "translateY(0)";
        }, 300);
      }, 2200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /*
   * CONTACT FORM
   */
  useEffect(() => {
    const form =
      document.getElementById(
        "contact-form"
      ) as HTMLFormElement | null;

    const status =
      document.getElementById(
        "form-status"
      );

    if (!form || !status) return;

    const submit = async (
      event: Event
    ) => {
      event.preventDefault();

      const button =
        form.querySelector<HTMLButtonElement>(
          ".contact-submit"
        );

      if (!button) return;

      button.disabled = true;

      button.textContent =
        "SENDING...";

      status.textContent =
        "Sending your message...";

      const payload =
        Object.fromEntries(
          new FormData(form).entries()
        ) as Record<
          string,
          FormDataEntryValue
        >;

      payload._subject =
        "New message from Kirthika Portfolio";

      payload._template = "table";

      payload._captcha = "false";

      payload._url =
        window.location.href;

      try {
        const response =
          await fetch(
            "https://formsubmit.co/ajax/kirthika2058@gmail.com",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          result.success === false
        ) {
          throw new Error(
            result.message ||
              "Unable to send"
          );
        }

        form.reset();

        status.textContent =
          "Message sent successfully. Thank you!";
      } catch {
        status.textContent =
          "Could not send right now. Please email kirthika2058@gmail.com directly.";
      } finally {
        button.disabled = false;

        button.textContent =
          "SEND MESSAGE";
      }
    };

    form.addEventListener(
      "submit",
      submit
    );

    return () => {
      form.removeEventListener(
        "submit",
        submit
      );
    };
  }, []);

  return (
    <div
      className="site-shell"
      id="home"
    >
      {/* SCROLL PROGRESS */}
      <div
        className="progress"
        ref={progressRef}
      />

      {/* CURSOR */}
      <div className="cursor-dot" />

      {/* NAVBAR */}
      <nav>
        <a
          href="#home"
          className="logo"
          onClick={() => setMobileMenuOpen(false)}
        >
          KIRTHIKA S
        </a>

        <div className="navlinks">
          <a href="#about">ABOUT</a>
          <a href="#services">SERVICES</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </div>

        <button
          type="button"
          className={`mobile-menu-button ${mobileMenuOpen ? "active" : ""}`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`mobile-menu ${mobileMenuOpen ? "show" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-label">NAVIGATION</div>

          {[
            ["#home", "HOME"],
            ["#about", "ABOUT"],
            ["#services", "SERVICES"],
            ["#projects", "PROJECTS"],
            ["#contact", "CONTACT"],
          ].map(([href, label], index) => (
            <a
              key={href}
              href={href}
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              <strong>{label}</strong>
              <i>↗</i>
            </a>
          ))}

          <div className="mobile-menu-footer">
            B.SC COMPUTER SCIENCE • FULL STACK DEVELOPER
          </div>
        </div>
      </div>

      <main>

        {/* ==========================================
            HERO
        ========================================== */}

        <section className="hero">
          <div className="hero-grid" />

          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-cross hero-cross-one" />
          <div className="hero-cross hero-cross-two" />

          <div className="hero-content">
            <div className="kicker">
              B.SC COMPUTER SCIENCE
              <span className="kicker-dot">•</span>
              <span id="role-text">
                FULL STACK DEVELOPER
              </span>
            </div>

            <div className="outline">
              HI, I'M
            </div>

            <div className="name">
              KIRTHIKA S
            </div>

            <div className="hero-copy-row">
              <p>
                A passionate B.Sc. Computer Science student
                and full stack developer creating clean,
                responsive and useful digital experiences.
              </p>

              <span className="hero-scroll-note">
                SCROLL TO EXPLORE ↓
              </span>
            </div>

            <div className="buttons">
              <a
                href="#projects"
                className="btn primary"
              >
                VIEW PROJECTS ↗
              </a>

              <a
                href="#contact"
                className="btn"
              >
                CONTACT ME
              </a>
            </div>
          </div>

          <div className="hero-skills" aria-label="Skills and strengths">
            <div className="hero-skills-track">
              {[
                "PYTHON",
                "MONGODB",
                "CLEAN CODE",
                "OPEN SOURCE",
                "FULL STACK DEVELOPMENT",
                "REACT",
                "FLASK",
                "MYSQL",
                "PYTHON",
                "MONGODB",
                "CLEAN CODE",
                "OPEN SOURCE",
                "FULL STACK DEVELOPMENT",
                "REACT",
                "FLASK",
                "MYSQL",
              ].map((skill, index) => (
                <span key={`${skill}-${index}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            ABOUT
        ========================================== */}

        <section id="about">
          <div className="section-head reveal">

            <div className="section-no">
              01 / ABOUT
            </div>

            <h2>
              WHO I AM
            </h2>

          </div>

          <div className="about">

            <div className="quote reveal">
              BETTER SKILLS.
              <br />

              <span>
                BRIGHTER FUTURE.
              </span>
            </div>

            <p className="reveal">
              I'm Kirthika S, a B.Sc.
              Computer Science student at
              Kongunadu Arts and Science
              College. I enjoy creating web
              and mobile applications,
              learning new technologies and
              turning ideas into practical
              solutions.
            </p>

          </div>
        </section>

        {/* ==========================================
            SERVICES
        ========================================== */}

        <section id="services">

          <div className="section-head reveal">

            <div className="section-no">
              02 / SERVICES
            </div>

            <h2>
              WHAT I DO
            </h2>

          </div>

          <div className="services">

            <div className="service reveal">

              <span>01</span>

              <h3>
                Web Development
              </h3>

              <p>
                Responsive interfaces
                using HTML, CSS, JavaScript
                and React.js with clean
                component-based design.
              </p>

            </div>

            <div className="service reveal">

              <span>02</span>

              <h3>
                Full Stack
              </h3>

              <p>
                Building complete
                applications with Python,
                Flask, APIs and database
                integration.
              </p>

            </div>

            <div className="service reveal">

              <span>03</span>

              <h3>
                Mobile Apps
              </h3>

              <p>
                Creating practical mobile
                experiences with Flutter
                and backend-connected
                features.
              </p>

            </div>

            <div className="service reveal">

              <span>04</span>

              <h3>
                Databases
              </h3>

              <p>
                Working with MongoDB,
                MySQL and SQLite for
                structured application
                data.
              </p>

            </div>

          </div>
        </section>

        {/* ==========================================
            PROJECTS
        ========================================== */}

        <section
          id="projects"
          className="projects"
        >

          <div className="section-head reveal">

            <div className="section-no">
              03 / PROJECTS
            </div>

            <h2>
              SELECTED WORK
            </h2>

          </div>

          <div className="projects-title reveal">

            <h2>
              PROJECTS
            </h2>

            <p>
              Scroll to explore
            </p>

          </div>

          <div className="project-stack">

            {projects.map(
              (project, index) => (

                <article
                  className={`project-card project-${project.theme} ${
                    mobileProjectIndex === index
                      ? "mobile-project-open"
                      : "mobile-project-collapsed"
                  }`}
                  style={
                    {
                      "--index": index,
                    } as CSSProperties
                  }
                  key={project.name}
                >

                  {/* PROJECT TOP */}
                  <div className="project-topline">

                    <span>
                      {project.number}
                    </span>

                    <div>

                      <small>
                        {project.eyebrow}
                      </small>

                      <h3>
                        {project.name}
                      </h3>

                    </div>

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name}`}
                      >
                        Live project

                        <ArrowIcon />
                      </a>
                    ) : (
                      <a href="#contact">
                        View project

                        <ArrowIcon />
                      </a>
                    )}

                    <button
                      type="button"
                      className="mobile-project-toggle"
                      aria-label={`${
                        mobileProjectIndex === index
                          ? "Collapse"
                          : "Expand"
                      } ${project.name}`}
                      aria-expanded={mobileProjectIndex === index}
                      onClick={() =>
                        setMobileProjectIndex((current) =>
                          current === index ? null : index
                        )
                      }
                    >
                      {mobileProjectIndex === index ? "−" : "+"}
                    </button>

                  </div>

                  {/* PROJECT DESCRIPTION */}
                  <div className="project-copy">

                    <p>
                      {project.description}
                    </p>

                    <div>

                      {project.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                  {/* PROJECT LIVE PREVIEW */}
                  <ProjectPreview
                    theme={
                      project.theme
                    }
                    url={
                      project.url
                    }
                    ransomware={
                      project.name ===
                      "Ransomware Detection"
                    }
                  />

                </article>

              )
            )}

          </div>

        </section>

        {/* ==========================================
            CONTACT
        ========================================== */}

        <section
          id="contact"
          className="contact"
        >

          <div className="section-no reveal">
            04 / CONTACT
          </div>

          <div className="contact-layout">

            {/* LEFT — LET'S TALK */}
            <div className="contact-talk">

              <h2 className="reveal">
                LET'S TALK
                <span>.</span>
              </h2>

              <p className="reveal">
                I'm open to internships,
                freelance work, and
                interesting collaborations.
                Tell me what you're building
                and let's make it happen.
              </p>

              <div className="contact-talk-line" />

            </div>

            {/* RIGHT */}
            <div className="contact-side">

              {/* EMAIL */}
              <div className="contact-email-block reveal">

                <a
                  href="mailto:kirthika2058@gmail.com"
                >
                  kirthika2058@gmail.com ↗
                </a>

              </div>

              {/* FORM */}
              <form
                id="contact-form"
                className="contact-form reveal"
              >

                <h3>
                  SEND A MESSAGE
                </h3>

                <div className="form-field">

                  <label htmlFor="contact-name">
                    YOUR NAME
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />

                </div>

                <div className="form-field">

                  <label htmlFor="contact-email">
                    YOUR EMAIL
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />

                </div>

                <div className="form-field">

                  <label htmlFor="contact-message">
                    MESSAGE
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message..."
                    required
                  />

                </div>

                <button
                  className="contact-submit"
                  type="submit"
                >
                  SEND MESSAGE ↗
                </button>

                <div
                  className="form-status"
                  id="form-status"
                  aria-live="polite"
                />

              </form>

              {/* SOCIAL ICONS */}
              <div className="socials reveal">

                {/* LINKEDIN */}
                <a
                  href="https://www.linkedin.com/in/kirthika16"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.9c0-3.76-2-5.52-4.67-5.52-2.15 0-3.1 1.18-3.63 2.01V8.5H9.2V21h3.5v-6.2c0-1.64.31-3.23 2.35-3.23 2.01 0 2.04 1.88 2.04 3.34V21H21v-7.1Z"
                    />
                  </svg>
                </a>

                {/* GITHUB */}
                <a
                  href="https://github.com/KIRTHIKA0816"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 .7A11.3 11.3 0 0 0 8.43 22.9c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.31-1.25-1.66-1.25-1.66-1.02-.69.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.12 1.15a10.8 10.8 0 0 1 5.68 0c2.17-1.45 3.12-1.15 3.12-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.04.76 2.1v3.1c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z"
                    />
                  </svg>
                </a>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer>

        <span>
          © 2026 KIRTHIKA S
        </span>

        <span>
          B.SC COMPUTER SCIENCE
          {" • "}
          FULL STACK DEVELOPER
        </span>

      </footer>

    </div>
  );
}