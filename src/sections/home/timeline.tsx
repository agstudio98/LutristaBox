export default function Timeline() {
  const events = [
    { year: '1991', title: 'Fundación', desc: 'Mauricio Mercado y Luciano Alboni fundan LutristaBox.' },
    { year: '2000', title: 'Expansión Nacional', desc: 'Cobertura en todo Argentina.' },
    { year: '2010', title: 'Flota Moderna', desc: 'Incorporación de vehículos de última generación.' },
    { year: '2020', title: 'Digitalización', desc: 'Sistema de tracking online para clientes.' },
    { year: '2026', title: 'Ag Studio', desc: 'Sitio web renovado con Ag Studio 2026.' },
  ];

  return (
    <section className="timeline-section">
      <h2>Nuestra Historia</h2>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-year">{event.year}</div>
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
