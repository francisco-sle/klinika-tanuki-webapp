import { Hamburger } from "../assets/icons/Hamburger";
import { Close } from "../assets/icons/Close";
import { useState, useRef, useEffect } from "react";
import tanukiSticker from "../assets/images/zine/tanuki-sticker.webp";

const navLinks = [
  { href: "#eventos", label: "Eventos" },
  { href: "#bazar-shop", label: "Bazar" },
  { href: "#stickers", label: "Stickers" },
  { href: "#plushies", label: "Peluches" },
  { href: "#keychains", label: "Llaveros" },
  { href: "#art", label: "Arte" },
  { href: "#services", label: "Servicios" },
  { href: "#sacrificio-barbarico", label: "Sacrificio Barbárico" },
  { href: "#contact", label: "Contacto" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setIsMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <nav className="main-nav" aria-label="Principal">
        <a href="#top" className="logo">
          <img src={tanukiSticker} width={960} height={735} alt="" />
          <span>
            Klinika Tanuki
            <small>colectivo</small>
          </span>
        </a>

        <ul className="desktop-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button
          ref={hamburgerRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <Close /> : <Hamburger />}
          {isMenuOpen ? "Cerrar" : "Menú"}
        </button>
      </nav>

      <nav
        id="mobile-menu"
        ref={menuRef}
        aria-label="Menú móvil"
        className={`mobile-menu ${
          isMenuOpen ? "visible scale-y-100 opacity-100" : "invisible scale-y-0 opacity-0"
        }`}
      >
        <ol>
          {navLinks.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setIsMenuOpen(false)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
};
