export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>LutristaBox</h3>
          <p>Logística en todo Argentina desde 1991.</p>
        </div>
        <div className="footer-section">
          <h4>Empresa</h4>
          <ul>
            <li><a href="#about">Nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Servicios</h4>
          <ul>
            <li><a href="#catalog">Catálogo</a></li>
            <li><a href="#support">Soporte</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 LutristaBox. Realizado con Ag Studio 2026.</p>
        </div>
      </div>
    </footer>
  );
}
