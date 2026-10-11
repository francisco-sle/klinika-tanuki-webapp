import "./App.css";
import alice from "./assets/images/alice.webp";
import kewpie from "./assets/images/kewpie.webp";
import theBeatles from "./assets/images/the-beatles.webp";
import kemonitoKuromi from "./assets/images/kemonito-kuromi.webp";
import axolotl from "./assets/images/axolotl.webp";
import alienCat from "./assets/images/alien-cat.webp";
import plushieBrown from "./assets/images/plushie-brown.webp";
import plushieGreen from "./assets/images/plushie-green.webp";
import keychainInside from "./assets/images/keychain-inside.webp";
import keychainFront from "./assets/images/keychain-front.webp";
import keychainBack from "./assets/images/keychain-back.webp";
import artChuy from "./assets/images/art-chuy.webp";
import artMalice from "./assets/images/art-malice.webp";
import artManchild from "./assets/images/art-manchild.webp";
import sbMerch1 from "./assets/images/SB/sb-merch-1.webp";
import sbMerch2 from "./assets/images/SB/sb-merch-2.webp";
import sbMerch3 from "./assets/images/SB/sb-merch-3.webp";
import sbMerch4 from "./assets/images/SB/sb-merch-4.webp";
import sbEvent1 from "./assets/images/SB/sb-event-1.webp";
import sbEvent2 from "./assets/images/SB/sb-event-2.webp";
import sbEvent3 from "./assets/images/SB/sb-event-3.webp";
import sbEvent4 from "./assets/images/SB/sb-event-4.webp";
import heroHalftone from "./assets/images/zine/hero-halftone.webp";
import sbHalftone from "./assets/images/zine/sb-halftone.webp";
import tanukiSticker from "./assets/images/zine/tanuki-sticker.webp";
import { Instagram } from "./assets/icons/Instagram";
import { Facebook } from "./assets/icons/Facebook";
import { Youtube } from "./assets/icons/Youtube";
import { Bandcamp } from "./assets/icons/Bandcamp";

import { Navbar } from "./components/Navbar";
import { Banner } from "./components/Banner";
import { Ribbons } from "./components/Ribbons";
import { Starburst } from "./components/Starburst";
import { ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.locale("es");

const SITE_URL = "https://klinikatanuki.com/";
const INSTAGRAM_URL = "https://www.instagram.com/klinika_tanuki/";
const SB_FACEBOOK_URL = "https://www.facebook.com/SACRIFICIOBARBARICOPV";

interface ZineEvent {
  id: string;
  name: string;
  url?: string;
  /** Venue name and address; defaults to Ensenada when omitted. */
  location?: string;
  startDate: Dayjs;
  endDate: Dayjs;
}

type EventStatus = "upcoming" | "live" | "past";

const events: ZineEvent[] = [
  {
    id: "1",
    name: "Paralelicuaro - Bazar de otoño",
    url: "https://www.instagram.com/p/DQsh9hfkXbZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    startDate: dayjs("2025-11-09T13:00:00"),
    endDate: dayjs("2025-11-09T21:00:00"),
  },
];

const flyers = [
  { src: sbEvent3, width: 1006, height: 1280 },
  { src: sbEvent2, width: 655, height: 1095 },
  { src: sbEvent1, width: 1440, height: 1919 },
  { src: sbEvent4, width: 638, height: 799 },
];

const categories = [
  { label: "Bazar", href: "#bazar-shop" },
  { label: "Arte", href: "#art" },
  { label: "Stickers", href: "#stickers" },
  { label: "Impresión", href: "#services" },
  { label: "Música", href: "#sacrificio-barbarico" },
  { label: "Artesanías", href: "#plushies" },
  { label: "Sacrificio Barbárico", href: "#sacrificio-barbarico" },
];

// Event times are local to Ensenada; keep them offset-free so the output
// doesn't depend on the timezone of the machine that renders it.
const LOCAL_DATETIME = "YYYY-MM-DDTHH:mm:ss";

const EventsJsonLd = ({ events }: { events: ZineEvent[] }) => {
  const data = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate.format(LOCAL_DATETIME),
    endDate: event.endDate.format(LOCAL_DATETIME),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location ?? "Ensenada, Baja California",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ensenada",
        addressRegion: "Baja California",
        addressCountry: "MX",
      },
    },
    image: `${SITE_URL}og-image.jpg`,
    description: `Encuentra a Klinika Tanuki en ${event.name}: bazar, stickers, peluches, llaveros y arte.`,
    url: event.url ?? `${SITE_URL}#eventos`,
  }));

  return (
    <script
      type="application/ld+json"
      // Escape "<" so event names can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};

const getStatus = (event: ZineEvent, now: Dayjs): EventStatus => {
  if (now.isAfter(event.endDate)) return "past";
  if (now.isAfter(event.startDate)) return "live";
  return "upcoming";
};

const isCloseToEvent = (date: Dayjs, now: Dayjs) => {
  const diffInDays = date.diff(now, "days");
  return diffInDays <= 3 && diffInDays >= 0;
};

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <ArrowTopRightOnSquareIcon aria-hidden="true" />
    <span className="sr-only">(se abre en una pestaña nueva)</span>
  </a>
);

const EventRow = ({ event, now }: { event: ZineEvent; now: Dayjs }) => {
  const status = getStatus(event, now);
  const hours = `${event.startDate.format("h:mm A")} – ${event.endDate.format("h:mm A")}`;

  let when: string;
  if (status === "live") when = `¡Estamos en el evento! · hasta las ${event.endDate.format("h:mm A")}`;
  else if (status === "past") when = event.startDate.format("D [de] MMMM [de] YYYY");
  else if (isCloseToEvent(event.startDate, now)) when = `${now.to(event.startDate)} · ${hours}`;
  else when = `${event.startDate.format("dddd D [de] MMMM [de] YYYY")} · ${hours}`;

  return (
    <li className={`event-row ${status === "past" ? "is-past" : ""}`}>
      <time className="date-block" dateTime={event.startDate.format(LOCAL_DATETIME)}>
        <b>{event.startDate.format("D")}</b>
        <span>{event.startDate.format("MMM YY").replace(".", "")}</span>
      </time>
      <div>
        <h3>{event.name}</h3>
        <p className="when">{when}</p>
      </div>
      <div className="event-actions">
        {status === "live" && <span className="live-pill">En vivo</span>}
        {status === "past" && <span className="stamp text-taffy">Ya pasó</span>}
        {event.url && <ExternalLink href={event.url}>Detalles</ExternalLink>}
      </div>
    </li>
  );
};

function App() {
  const now = dayjs();
  const upcoming = events
    .filter((e) => getStatus(e, now) !== "past")
    .sort((a, b) => a.startDate.diff(b.startDate));
  const past = events
    .filter((e) => getStatus(e, now) === "past")
    .sort((a, b) => b.startDate.diff(a.startDate));

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-radioactive focus:px-4 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Banner />
      <Navbar />

      <main id="contenido">
        {/* ---------------- Hero ---------------- */}
        <section id="top" className="zine-section zine-paper hero">
          <div className="zine-inner">
            <div className="meta-row">
              <span>Nº 01 // Ensenada, B.C.</span>
              <span className="hidden sm:inline">
                Arte · Bazar · Música · Impresión
              </span>
              <span>@klinika_tanuki</span>
            </div>

            <h1 className="hero-title">
              <span>Klinika</span>{" "}
              <span className="indent">Tanuki</span>
            </h1>

            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-tagline">
                  Centro de Reinserción Social de Objetos
                </p>
                <p className="max-w-lg text-lg sm:text-xl">
                  Colectivo de artistas y creadores independientes de
                  Ensenada, Baja California.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    className="btn btn-ink"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                    Síguenos
                  </a>
                  <a className="btn btn-green" href="#bazar-shop">
                    Ver catálogo ↓
                  </a>
                </div>
                <nav aria-label="Categorías" className="mt-2 flex flex-col gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em]">
                    Encuentra →
                  </p>
                  <div className="category-links">
                    {categories.map((c) => (
                      <a key={c.label} href={c.href}>
                        {c.label}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>

              <div className="hero-collage">
                <figure className="photo tape tape-pink">
                  <img
                    src={heroHalftone}
                    width={900}
                    height={900}
                    fetchPriority="high"
                    alt="Sticker de Klinika Tanuki: un tanuki con el lema Centro de Reinserción Social de Objetos"
                  />
                  <figcaption>Fig. 1 — Sticker oficial</figcaption>
                </figure>
                <img className="mascot" src={tanukiSticker} width={960} height={735} alt="" />
                <Starburst className="burst">Hecho a mano</Starburst>
              </div>
            </div>
          </div>
        </section>

        <Ribbons
          green={[
            "Bazar",
            "Arte",
            "Stickers",
            "Impresión",
            "Música",
            "Artesanías",
            "Peluches",
            "Llaveros",
          ]}
          pink={[
            "Hecho en Ensenada",
            "Hazlo tú mismo",
            "Arte independiente",
            "Reinserción social de objetos",
            "Sacrificio Barbárico",
          ]}
        />

        {/* ---------------- Events ---------------- */}
        <section id="eventos" className="zine-section zine-ink events">
          <div className="zine-inner">
            <div className="meta-row text-paper/70">
              <span>Nº 02 // Agenda</span>
              <span>Bazares · Tocadas · Ferias</span>
            </div>
            <div className="events-head mt-8">
              <h2 className="section-title">
                Próximos
                <br />
                eventos
              </h2>
              <p className="section-kicker -rotate-3 text-taffy">
                ¡Ven a vernos!
              </p>
            </div>

            {upcoming.length > 0 && <EventsJsonLd events={upcoming} />}
            {upcoming.length > 0 ? (
              <ol className="event-list">
                {upcoming.map((event) => (
                  <EventRow key={event.id} event={event} now={now} />
                ))}
              </ol>
            ) : (
              <div className="events-empty">
                <p>
                  No tenemos eventos agendados por ahora. Síguenos en Instagram
                  para enterarte del próximo bazar.
                </p>
                <a
                  className="btn btn-green"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                  Avísame
                </a>
              </div>
            )}

            {past.length > 0 && (
              <>
                <p className="archive-label">Archivo</p>
                <ol className="event-list mt-0!">
                  {past.map((event) => (
                    <EventRow key={event.id} event={event} now={now} />
                  ))}
                </ol>
              </>
            )}
          </div>
        </section>

        {/* ---------------- Catalog ---------------- */}
        <section className="zine-section zine-paper torn-top catalog">
          <div className="zine-inner">
            <div className="meta-row">
              <span>Nº 03 // Catálogo</span>
              <span>Hecho en Ensenada, B.C.</span>
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-title">Catálogo</h2>
              <p className="section-kicker rotate-2">
                Lo que encontrarás en nuestra mesa
              </p>
            </div>

            <div className="catalog-grid">
              <article id="bazar-shop" className="page fade-in">
                <header className="page-head">
                  <p className="page-num">
                    <span>Nº 01</span>
                    <span>Segunda mano</span>
                  </p>
                  <h2>Bazar</h2>
                </header>
                <div className="photo-pair">
                  <figure className="snap tape">
                    <img src={kewpie} width={1237} height={1649} loading="lazy" decoding="async" alt="Muñeca Kewpie vintage" />
                  </figure>
                  <figure className="snap tape tape-pink tape-right">
                    <img src={alice} width={1237} height={1237} loading="lazy" decoding="async" alt="Muñeca de porcelana con bufanda verde" />
                  </figure>
                </div>
                <p className="blurb">
                  Le buscamos un nuevo hogar a todos esos objetos olvidados en
                  el tiempo.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">Ropa</span>
                  <span className="tag">Coleccionables</span>
                  <span className="tag">Materiales</span>
                </div>
                <div className="page-foot">
                  <ExternalLink href={INSTAGRAM_URL}>Pregunta por DM</ExternalLink>
                </div>
              </article>

              <article id="stickers" className="page page-ink fade-in">
                <header className="page-head">
                  <p className="page-num">
                    <span>Nº 02</span>
                    <span>Diseños propios</span>
                  </p>
                  <h2 className="text-radioactive">Stickers</h2>
                </header>
                <div className="sticker-sheet">
                  <img src={theBeatles} width={1635} height={600} loading="lazy" decoding="async" alt="Stickers de The Beatles estilo chibi" />
                  <img src={kemonitoKuromi} width={600} height={640} loading="lazy" decoding="async" alt="Sticker de Kuromi" />
                  <img src={alienCat} width={600} height={678} loading="lazy" decoding="async" alt="Sticker de gato alien verde" />
                  <img src={axolotl} width={600} height={553} loading="lazy" decoding="async" alt="Sticker de ajolote rosa" />
                </div>
                <p className="blurb">
                  Diseños propios, impresos y suajados por el colectivo.
                </p>
                <div className="dymo-list">
                  <span className="dymo">@coriander_escamilla</span>
                  <span className="dymo">@pepperjam_art</span>
                  <span className="dymo">@aleescamillapv</span>
                </div>
                <div className="page-foot">
                  <span className="stamp text-taffy">Tienda próximamente</span>
                  <ExternalLink href={INSTAGRAM_URL}>Pide por DM</ExternalLink>
                </div>
              </article>

              <article id="plushies" className="page page-pink fade-in">
                <header className="page-head">
                  <p className="page-num">
                    <span>Nº 03</span>
                    <span>Hecho a mano</span>
                  </p>
                  <h2>Peluches</h2>
                </header>
                <div className="photo-even">
                  <figure className="snap tape tape-paper">
                    <img src={plushieBrown} width={600} height={800} loading="lazy" decoding="async" alt="Peluche de osito café con moño" />
                  </figure>
                  <figure className="snap tape tape-right">
                    <img src={plushieGreen} width={600} height={800} loading="lazy" decoding="async" alt="Peluche llavero de alien verde" />
                  </figure>
                </div>
                <p className="blurb">Peluches y peluches-llavero hechos a mano.</p>
                <div className="dymo-list">
                  <span className="dymo">@pepperjam_art</span>
                </div>
                <div className="page-foot">
                  <ExternalLink href={INSTAGRAM_URL}>Pide por DM</ExternalLink>
                </div>
              </article>

              <article id="keychains" className="page fade-in">
                <header className="page-head">
                  <p className="page-num">
                    <span>Nº 04</span>
                    <span>Acrílico</span>
                  </p>
                  <h2>Llaveros</h2>
                </header>
                <div className="keychain-grid">
                  <figure className="snap tape">
                    <img src={keychainFront} width={600} height={585} loading="lazy" decoding="async" alt="Llavero de acrílico, vista frontal" />
                    <figcaption>Frontal</figcaption>
                  </figure>
                  <figure className="snap tape tape-pink tape-right">
                    <img src={keychainBack} width={600} height={642} loading="lazy" decoding="async" alt="Llavero de acrílico, vista trasera" />
                    <figcaption>Trasera</figcaption>
                  </figure>
                  <figure className="snap tape">
                    <img src={keychainInside} width={974} height={600} loading="lazy" decoding="async" alt="Llavero de acrílico abierto, vista interior" />
                    <figcaption>Interior</figcaption>
                  </figure>
                </div>
                <p className="blurb">Llaveros de acrílico con arte y diseño propio.</p>
                <div className="dymo-list">
                  <span className="dymo">@coriander_escamilla</span>
                </div>
                <div className="page-foot">
                  <span className="stamp">Tienda próximamente</span>
                  <ExternalLink href={INSTAGRAM_URL}>Pide por DM</ExternalLink>
                </div>
              </article>

              <article id="art" className="page page-green fade-in">
                <header className="page-head">
                  <p className="page-num">
                    <span>Nº 05</span>
                    <span>Originales</span>
                  </p>
                  <h2>Arte</h2>
                </header>
                <div className="art-gallery">
                  <figure className="snap tape tape-pink">
                    <img src={artMalice} width={800} height={1633} loading="lazy" decoding="async" alt="Ilustración de chica gótica con vestido azul" />
                  </figure>
                  <figure className="snap tape tape-paper tape-right">
                    <img src={artChuy} width={600} height={600} loading="lazy" decoding="async" alt="Collage de muñeca con lágrimas rojas" />
                  </figure>
                  <figure className="snap">
                    <img src={artManchild} width={800} height={800} loading="lazy" decoding="async" alt="Ilustración de chica en una tina con cerditos" />
                  </figure>
                </div>
                <div className="dymo-list">
                  <span className="dymo">@coriander_escamilla</span>
                  <span className="dymo">@pepperjam_art</span>
                  <span className="dymo">@aleescamillapv</span>
                </div>
                <div className="page-foot">
                  <span className="stamp">Próximamente</span>
                  <ExternalLink href={INSTAGRAM_URL}>Pregunta por DM</ExternalLink>
                </div>
              </article>

              <aside className="catalog-note tape tape-right fade-in">
                <h3>¿Te interesa algo?</h3>
                <p>
                  Escríbenos por Instagram para precios y disponibilidad. Las
                  piezas son únicas o de tiraje corto.
                </p>
                <a
                  className="btn btn-pink"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                  Mándanos DM
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ---------------- Services ---------------- */}
        <section id="services" className="zine-section zine-green torn-top services">
          <div className="zine-inner">
            <div className="meta-row">
              <span>Nº 04 // Servicios</span>
              <span>Cotiza por DM</span>
            </div>
            <div className="services-layout mt-8">
              <header>
                <h2 className="section-title">Servicios</h2>
                <p className="max-w-sm text-lg">
                  ¿Tienes un proyecto? Te ayudamos con diseño, impresión y
                  desarrollo web.
                </p>
                <a
                  className="btn btn-ink"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                  Contáctanos
                </a>
              </header>
              <ol className="service-list">
                <li>
                  <span className="num" aria-hidden="true">01</span>
                  <h3>Diseño gráfico</h3>
                  <p>Negocio, redes sociales, tarjetas de presentación.</p>
                </li>
                <li>
                  <span className="num" aria-hidden="true">02</span>
                  <h3>Impresión</h3>
                  <p>Impresión de stickers, con suaje y laminado.</p>
                </li>
                <li>
                  <span className="num" aria-hidden="true">03</span>
                  <h3>Desarrollo web</h3>
                  <p>Te creamos tu sitio web o menú interactivo.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ---------------- Sacrificio Barbárico ---------------- */}
        <section
          id="sacrificio-barbarico"
          className="zine-section zine-ink torn-top band"
        >
          <div className="zine-inner">
            <div className="meta-row text-paper/70">
              <span>Nº 05 // Música</span>
              <span>Ensenada, B.C.</span>
            </div>
            <h2 className="band-title">
              <span>Sacrificio</span>{" "}
              <span className="outline">Barbárico</span>
            </h2>
            <div className="band-intro">
              <span className="stamp">Powerviolence</span>
              <p>Powerviolence de Ensenada, B.C.</p>
            </div>

            <div className="band-grid">
              <div className="flex flex-col gap-10">
                <figure className="band-photo tape tape-pink">
                  <img src={sbHalftone} width={900} height={528} loading="lazy" decoding="async" alt="Integrantes de Sacrificio Barbárico frente a una tienda" />
                </figure>
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/oC-YMeXGDcI"
                    title="Sacrificio Barbárico - EP (Powerviolence)"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="band-block">
                  <h3>Escúchalos</h3>
                  <div className="social-links">
                    <a
                      aria-label="Sacrificio Barbárico en Instagram"
                      href="https://www.instagram.com/sacrificio.barbaricopv/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram />
                    </a>
                    <a
                      aria-label="Sacrificio Barbárico en Facebook"
                      href={SB_FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook />
                    </a>
                    <a
                      aria-label="Sacrificio Barbárico en YouTube"
                      href="https://www.youtube.com/@SACRIFICIOBARBARICO"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube />
                    </a>
                    <a
                      aria-label="Escucha Sin Saber Afinar en Bandcamp"
                      href="https://sacrificiobarbarico.bandcamp.com/album/ep-1-sin-saber-afinar"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Bandcamp />
                    </a>
                  </div>
                  <span className="dymo w-fit">@sacrificio.barbaricopv</span>
                </div>
              </div>

              <div className="band-block">
                <h3>Merch</h3>
                <div className="merch-grid">
                  <figure>
                    <img src={sbMerch1} width={1000} height={1010} loading="lazy" decoding="async" alt="Camisa negra de Sacrificio Barbárico, diseño 2025" />
                    <figcaption>
                      <b>S.B.</b>
                      <span>Camisa XL Diseño 2025</span>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={sbMerch3} width={1255} height={800} loading="lazy" decoding="async" alt="Cassette Sin Saber Afinar" />
                    <figcaption>
                      <b>S.B.</b>
                      <span>Sin Saber Afinar Cassette 2024</span>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={sbMerch2} width={1000} height={909} loading="lazy" decoding="async" alt="Camisa negra S.B., diseño 2024" />
                    <figcaption>
                      <b>S.B.</b>
                      <span>Camisa XL Diseño 2024</span>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={sbMerch4} width={1266} height={800} loading="lazy" decoding="async" alt="Stickers de Sacrificio Barbárico" />
                    <figcaption>
                      <b>S.B.</b>
                      <span>Stickers</span>
                    </figcaption>
                  </figure>
                </div>
                <a
                  className="btn btn-pink mt-2 w-full"
                  href={SB_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consulta existencias
                  <ArrowTopRightOnSquareIcon aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="band-block mt-16">
              <h3>Tocadas</h3>
              <div className="flyer-wall" tabIndex={0} aria-label="Flyers de tocadas">
                {flyers.map(({ src, width, height }, i) => (
                  <figure key={src} className="tape tape-paper">
                    <img
                      src={src}
                      width={width}
                      height={height}
                      loading="lazy"
                      decoding="async"
                      alt={`Flyer de tocada de Sacrificio Barbárico ${i + 1}`}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="zine-section zine-pink torn-top contact">
          <div className="zine-inner">
            <div className="meta-row">
              <span>Nº 06 // Contacto</span>
              <span>@klinika_tanuki</span>
            </div>
            <div className="contact-layout mt-10">
              <div className="copy">
                <h2 className="contact-title">
                  ¿Hacemos algo
                  <br />
                  juntos?
                </h2>
                <p className="max-w-xl text-lg">
                  Si quieres ver más de nuestros productos, o quieres que te
                  ayudemos a crear algo, contáctanos por cualquiera de nuestras
                  redes sociales.
                </p>
                <a
                  className="btn btn-ink"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                  Escríbenos en Instagram
                </a>
              </div>
              <img className="mascot" src={tanukiSticker} width={960} height={735} loading="lazy" decoding="async" alt="" />
            </div>
          </div>
        </section>
      </main>

      <footer className="zine-section zine-ink torn-top site-footer">
        <div className="zine-inner">
          <img src={tanukiSticker} width={960} height={735} loading="lazy" decoding="async" alt="Klinika Tanuki" />
          <div className="meta-row footer-meta text-paper/70">
            <span>Klinika Tanuki</span>
            <span>Ensenada, B.C.</span>
            <a className="hover:text-radioactive" href="#top">
              Volver arriba ↑
            </a>
          </div>
          <p>© {now.year()} Klinika Tanuki. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
