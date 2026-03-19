const sales = [
  { title: '10% OFF Express', desc: 'Primer envío.' },
  { title: 'Gratis sobre $5000', desc: 'Envío nacional.' },
  { title: 'Tracking Gratis', desc: 'Para todos los clientes.' },
];

export default function Sales() {
  return (
    <section className="sales-section">
      <h2>Promociones</h2>
      <div className="sales-grid">
        {sales.map((sale, index) => (
          <div key={index} className="sale-card">
            <h3>{sale.title}</h3>
            <p>{sale.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
