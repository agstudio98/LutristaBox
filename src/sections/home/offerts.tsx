import { useEffect, useRef } from 'react';

const offers = [
  {
    title: 'Paquetería Express',
    img:   'https://img.icons8.com/ios/120/1a3a8a/box.png',
    imgHover: 'https://img.icons8.com/ios-filled/120/1a3a8a/box.png',
    desc:  'Entregas en 24hs en todo el país con seguimiento en tiempo real.',
    tag:   '24 h',
  },
  {
    title: 'Carga Pesada',
    img:   'https://img.icons8.com/ios/120/1a3a8a/truck.png',
    imgHover: 'https://img.icons8.com/ios-filled/120/1a3a8a/truck.png',
    desc:  'Transporte de hasta 10 toneladas con flota propia y operadores certificados.',
    tag:   '10 T',
  },
  {
    title: 'Logística Fría',
    img:   'https://img.icons8.com/ios/120/1a3a8a/temperature.png',
    imgHover: 'https://img.icons8.com/ios-filled/120/1a3a8a/temperature.png',
    desc:  'Cadena de frío garantizada de extremo a extremo para productos perecederos.',
    tag:   '−18 °C',
  },
  {
    title: 'Interprovincial',
    img:   'https://img.icons8.com/ios/120/1a3a8a/waypoint-map.png',
    imgHover: 'https://img.icons8.com/ios-filled/120/1a3a8a/waypoint-map.png',
    desc:  'Cobertura en las 23 provincias argentinas con rutas optimizadas.',
    tag:   '23 prov.',
  },
];

export default function Offerts() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Intersection Observer — revela cards al entrar al viewport
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.offer-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('offer-card--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="offerts-section">

      {/* Header */}
      <div className="offerts-header">
        <span className="offerts-eyebrow">Servicios</span>
        <h2 className="offerts-title">Catálogos Destacados</h2>
        <p className="offerts-subtitle">
          Soluciones de transporte adaptadas a cada necesidad logística.
        </p>
      </div>

      {/* Grid */}
      <div className="offerts-grid" ref={gridRef}>
        {offers.map((offer) => (
          <div key={offer.title} className="card offer-card">

            {/* Badge de referencia rápida */}
            <span className="offer-tag">{offer.tag}</span>

            {/* Imagen — monocromática con efecto fade a filled en hover */}
            <div className="offer-img-wrap">
              <img
                src={offer.img}
                alt={offer.title}
                className="offer-icon offer-icon--outline"
              />
              <img
                src={offer.imgHover}
                alt=""
                className="offer-icon offer-icon--filled"
                aria-hidden="true"
              />
            </div>

            {/* Texto */}
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-desc">{offer.desc}</p>

            {/* CTA sutil */}
            <button className="offer-cta" aria-label={`Ver más sobre ${offer.title}`}>
              <img
                src="https://img.icons8.com/ios/16/1a3a8a/long-arrow-right.png"
                alt="→"
              />
              <span>Ver más</span>
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}