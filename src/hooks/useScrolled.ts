// ── useScrolled.ts ────────────────────────────────
// Devuelve true cuando el usuario scrolleó más de un umbral (px)
import { useState, useEffect } from 'react';

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

// ── Uso en tu Navbar.tsx ──────────────────────────
/*
import { useScrolled } from './useScrolled';

export default function Navbar() {
  const scrolled = useScrolled(60);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      ...
    </nav>
  );
}
*/

// ── ThreeBackground — agregar en App.tsx ──────────
/*
import ThreeBackground from './ThreeBackground';

export default function App() {
  return (
    <div className="app">
      <ThreeBackground />   // <-- primero, fijo detrás de todo
      <Navbar />
      <main className="main-content">
        ...
      </main>
      <Footer />
    </div>
  );
}
*/

// ── URLs de imágenes para reemplazar emojis ───────
// Usá estas URLs directamente en src="" de <img> o en CSS background-image

export const ICONS = {
  // Logo principal de la empresa (camión)
  logo:        'https://img.icons8.com/fluency/200/delivery-truck.png',

  // Íconos de productos / ofertas
  truck:       'https://img.icons8.com/fluency/96/delivery-truck.png',
  warehouse:   'https://img.icons8.com/fluency/96/warehouse.png',
  tracking:    'https://img.icons8.com/fluency/96/gps-device.png',
  package:     'https://img.icons8.com/fluency/96/box.png',
  calendar:    'https://img.icons8.com/fluency/96/planner.png',
  shield:      'https://img.icons8.com/fluency/96/insurance.png',
  handshake:   'https://img.icons8.com/fluency/96/handshake.png',
  star:        'https://img.icons8.com/fluency/96/star.png',
  route:       'https://img.icons8.com/fluency/96/waypoint-map.png',
  invoice:     'https://img.icons8.com/fluency/96/invoice.png',

  // Fundadores — avatares placeholder
  founder1:    'https://img.icons8.com/fluency/96/businessman.png',
  founder2:    'https://img.icons8.com/fluency/96/businesswoman.png',
} as const;

// ── Ejemplo de uso en un ProductCard ─────────────
/*
import { ICONS } from './icons';

export function ProductCard({ type, name, price }) {
  return (
    <div className="card product-card">
      <img
        src={ICONS[type] ?? ICONS.package}
        alt={name}
        className="product-icon"
      />
      <h3>{name}</h3>
      <p className="price">${price}</p>
      <button className="contact-btn">Contactar</button>
    </div>
  );
}
*/