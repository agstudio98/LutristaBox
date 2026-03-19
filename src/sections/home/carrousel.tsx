import { useState, useEffect } from 'react';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&auto=format&fit=crop&q=80',
    caption: 'Logística confiable desde 1991',
    sub: 'Más de 30 años conectando distribuidoras con todo el país, con puntualidad y cuidado en cada entrega.',
    tag: 'Trayectoria',
  },
  {
    img: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?w=1800&auto=format&fit=crop&q=80',
    caption: 'Servicio en todo Argentina',
    sub: 'Flota propia disponible las 24 horas para cubrir rutas urbanas, interurbanas y del interior del país.',
    tag: 'Cobertura nacional',
  },
  {
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&auto=format&fit=crop&q=80',
    caption: 'Modernos sistemas de tracking',
    sub: 'Tecnología GPS en tiempo real para que tu mercadería siempre esté bajo control, desde la salida hasta el destino.',
    tag: 'Tecnología',
  },
];

export default function Carrousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating || index === currentSlide) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="carrousel-section">
      <div className="carrousel-container">

        {/* ── Fondo: imágenes ── */}
        <div className="carrousel-slides">
          {slides.map((s, i) => (
            <div key={i} className={`slide ${i === currentSlide ? 'active' : ''}`}>
              <img src={s.img} alt={s.caption} />
            </div>
          ))}
          <div className="carrousel-overlay" />
        </div>

        {/* ── Emblema centrado sobre la imagen ── */}
        <div className="carrousel-emblem">
          <div className="emblem-logo-wrap">
            <img
              src="https://img.icons8.com/ios/80/ffffff/truck.png"
              alt="LutristaBox"
              className="emblem-logo-img"
            />
          </div>
          <span className="emblem-name">LutristaBox</span>
          <span className="emblem-tagline">Logística · Argentina</span>
        </div>

        {/* ── Número de slide (esquina superior izquierda) ── */}
        <div className="carrousel-counter">
          <span className="counter-current">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="counter-sep" />
          <span className="counter-total">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── Panel lateral derecho con texto del slide ── */}
        <div className={`slide-panel ${animating ? 'panel-exit' : 'panel-enter'}`}>
          <span className="slide-tag">{slide.tag}</span>
          <h2 className="slide-title">{slide.caption}</h2>
          <p className="slide-sub">{slide.sub}</p>

          {/* Descripción breve de la empresa */}
          <div className="slide-company-desc">
            <img
              src="https://img.icons8.com/ios/16/1a3a8a/route.png"
              alt=""
              className="slide-company-icon"
            />
            <p>Distribución nacional desde 1991. Flota propia, cadena de frío y tracking en tiempo real.</p>
          </div>

          <div className="carrousel-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={i === currentSlide ? 'dot active' : 'dot'}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className="carrousel-scroll-hint">
          <img
            src="https://img.icons8.com/ios/18/ffffff/circled-down-2.png"
            alt="scroll"
            className="scroll-hint-icon"
          />
          <span>Explorá</span>
        </div>

      </div>
    </section>
  );
}