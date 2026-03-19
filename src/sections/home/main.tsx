import { useEffect, useRef } from 'react';

export default function Main() {
  const sectionRef = useRef<HTMLElement>(null);

  // Staggered reveal on mount
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.main-reveal');
    els?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.18}s`;
      el.classList.add('main-reveal--visible');
    });
  }, []);

  return (
    <section className="home-main" ref={sectionRef}>

      {/* Líneas decorativas de fondo */}
      <div className="main-lines" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      {/* Contenido central */}
      <div className="main-inner">

        {/* Logo / imagen principal */}
        <div className="main-logo-wrap main-reveal">
          <div className="main-logo-ring" />
          <img
            src="https://img.icons8.com/ios/200/1a3a8a/truck.png"
            alt="LutristaBox logística"
            className="main-logo-img"
          />
        </div>

        {/* Nombre de marca */}
        <h1 className="brand-name main-reveal">LutristaBox</h1>

        {/* Separador */}
        <div className="main-divider main-reveal" aria-hidden="true">
          <span />
          <img
            src="https://img.icons8.com/ios/24/1a3a8a/route.png"
            alt=""
            className="main-divider-icon"
          />
          <span />
        </div>

        {/* Bio */}
        <div className="microbio main-reveal">
          <p>
            Empresa de logística que conecta distribuidoras
            con todo el territorio argentino.
          </p>
        </div>

        {/* Fundadores — glass pill */}
        <div className="main-founders-pill main-reveal">
          <img
            src="https://img.icons8.com/ios/20/1a3a8a/conference-call.png"
            alt=""
          />
          <p>
            Fundada en <strong>1991</strong> por{' '}
            <strong>Mauricio Mercado</strong> y{' '}
            <strong>Luciano Alboni</strong>
          </p>
        </div>

        {/* Stats en glass cards */}
        <div className="main-stats main-reveal">
          {[
            { value: '33+', label: 'años de experiencia' },
            { value: '24h',  label: 'entregas express' },
            { value: '10T',  label: 'capacidad de carga' },
          ].map(({ value, label }) => (
            <div key={label} className="main-stat-card">
              <span className="main-stat-value">{value}</span>
              <span className="main-stat-label">{label}</span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}