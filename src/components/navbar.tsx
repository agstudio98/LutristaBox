import { useScrolled } from '../hooks/useScrolled';

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: 'home' | 'catalog' | 'support') => void;
}

export default function Navbar({ currentSection, onSectionChange }: NavbarProps) {
  const isScrolled = useScrolled();

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <h1>LutristaBox</h1>
        </div>
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
              onClick={() => onSectionChange('home')}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentSection === 'catalog' ? 'active' : ''}`}
              onClick={() => onSectionChange('catalog')}
            >
              Catálogo
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentSection === 'support' ? 'active' : ''}`}
              onClick={() => onSectionChange('support')}
            >
              Soporte
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
