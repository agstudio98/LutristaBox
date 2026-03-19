import { useState, useEffect, useRef } from 'react';

/* ── Datos del catálogo ─────────────────────────── */
const CATALOG_ITEMS = [
  {
    id: 1,
    title: 'Distribución Express',
    category: 'express',
    price: 'Desde $8.500',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/express-delivery.png',
    desc: 'Entrega en 24 hs en AMBA e interior. Ideal para e-commerce y distribuidoras urgentes.',
    tags: ['24 h', 'AMBA', 'Interior'],
  },
  {
    id: 2,
    title: 'Carga Fraccionada',
    category: 'carga',
    price: 'Desde $12.000',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/box.png',
    desc: 'Consolidamos tu carga con otros envíos. Eficiencia máxima para volúmenes medios.',
    tags: ['LTL', 'Consolidado', 'Económico'],
  },
  {
    id: 3,
    title: 'Carga Completa',
    category: 'carga',
    price: 'Desde $45.000',
    img: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/truck.png',
    desc: 'Camión exclusivo para tu carga. Sin transbordos, máxima seguridad hasta 10 toneladas.',
    tags: ['FTL', 'Exclusivo', '10 T'],
  },
  {
    id: 4,
    title: 'Logística Fría',
    category: 'especial',
    price: 'Desde $18.500',
    img: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/temperature.png',
    desc: 'Cadena de frío controlada de 0 °C a −18 °C. Certificados ANMAT para alimentos y fármacos.',
    tags: ['Frío', 'ANMAT', 'Perecederos'],
  },
  {
    id: 5,
    title: 'Tracking Premium',
    category: 'tecnologia',
    price: 'Desde $3.200',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/gps-device.png',
    desc: 'GPS en tiempo real, alertas por WhatsApp y panel web para tu equipo. Sin sorpresas.',
    tags: ['GPS', 'Tiempo real', 'API'],
  },
  {
    id: 6,
    title: 'Depósito Fiscal',
    category: 'almacen',
    price: 'Desde $22.000/mes',
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/warehouse.png',
    desc: 'Almacenamiento con control de inventario, pick & pack y despacho diario.',
    tags: ['WMS', 'Pick & Pack', 'B2B'],
  },
  {
    id: 7,
    title: 'Distribución Capilar',
    category: 'express',
    price: 'Desde $6.800',
    img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/waypoint-map.png',
    desc: 'Cobertura en puntos de venta, kioscos y comercios minoristas de todo el país.',
    tags: ['Capilar', 'Minorista', 'Masivo'],
  },
  {
    id: 8,
    title: 'Logística Inversa',
    category: 'especial',
    price: 'A cotizar',
    img: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&auto=format&fit=crop&q=75',
    icon: 'https://img.icons8.com/ios/48/1a3a8a/return-purchase.png',
    desc: 'Gestión de devoluciones y retiros con trazabilidad completa e informes de estado.',
    tags: ['Devoluciones', 'Retiros', 'Trazable'],
  },
];

const CATEGORIES = [
  { value: 'todos',      label: 'Todos' },
  { value: 'express',   label: 'Express' },
  { value: 'carga',     label: 'Carga' },
  { value: 'especial',  label: 'Especial' },
  { value: 'tecnologia',label: 'Tecnología' },
  { value: 'almacen',   label: 'Almacén' },
];

/* ── ProductFilter ───────────────────────────────── */
function ProductFilter({
  search, setSearch,
  category, setCategory,
}: {
  search: string; setSearch: (v: string) => void;
  category: string; setCategory: (v: string) => void;
}) {
  return (
    <div className="catalog-filter">
      {/* Buscador */}
      <div className="catalog-search-wrap">
        <img
          src="https://img.icons8.com/ios/18/1a3a8a/search.png"
          alt="buscar"
          className="catalog-search-icon"
        />
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="catalog-search-input"
        />
      </div>

      {/* Categorías — pill tabs */}
      <div className="catalog-tabs">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            className={`catalog-tab ${category === c.value ? 'catalog-tab--active' : ''}`}
            onClick={() => setCategory(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Catalog card ────────────────────────────────── */
function CatalogCard({ item, index }: { item: typeof CATALOG_ITEMS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ccard--visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ccard"
      style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
    >
      {/* Imagen de fondo con overlay */}
      <div className="ccard-img-wrap">
        <img src={item.img} alt={item.title} className="ccard-bg" />
        <div className="ccard-img-overlay" />
        {/* Ícono centrado sobre la imagen */}
        <div className="ccard-icon-wrap">
          <img src={item.icon} alt="" className="ccard-icon" />
        </div>
      </div>

      {/* Contenido */}
      <div className="ccard-body">
        {/* Tags */}
        <div className="ccard-tags">
          {item.tags.map(t => (
            <span key={t} className="ccard-tag">{t}</span>
          ))}
        </div>

        <h3 className="ccard-title">{item.title}</h3>
        <p className="ccard-desc">{item.desc}</p>

        <div className="ccard-footer">
          <span className="ccard-price">{item.price}</span>
          <button className="ccard-btn">
            <span>Consultar</span>
            <img
              src="https://img.icons8.com/ios/14/ffffff/long-arrow-right.png"
              alt="→"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── CatalogSection principal ────────────────────── */
export default function CatalogSection() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');

  const filtered = CATALOG_ITEMS.filter(item => {
    const matchCat = category === 'todos' || item.category === category;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
      || item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="catalog-section">

      {/* Header */}
      <div className="catalog-header">
        <span className="catalog-eyebrow">Servicios</span>
        <h1 className="catalog-title">Nuestro Catálogo</h1>
        <p className="catalog-subtitle">
          Soluciones de transporte y logística diseñadas para cada etapa
          de tu cadena de distribución.
        </p>
      </div>

      {/* Filtros */}
      <ProductFilter
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="catalog-grid">
          {filtered.map((item, i) => (
            <CatalogCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <img
            src="https://img.icons8.com/ios/64/1a3a8a/nothing-found.png"
            alt="Sin resultados"
          />
          <p>No encontramos servicios para ese criterio.</p>
        </div>
      )}

    </main>
  );
}