const products = [
  { id: 1, title: 'Paquete Express', category: 'paqueteria', price: 1500, img: '📦' },
  { id: 2, title: 'Caja Grande', category: 'carga', price: 3500, img: '📦' },
  { id: 3, title: 'Refrigerado', category: 'fria', price: 2500, img: '❄️' },
  { id: 4, title: 'Paquete Standard', category: 'paqueteria', price: 800, img: '📫' },
  { id: 5, title: 'Carga Pesada 5T', category: 'carga', price: 12000, img: '🚛' },
  { id: 6, title: 'Urgente 12hs', category: 'paqueteria', price: 2800, img: '⚡' },
  { id: 7, title: 'Frío Médico', category: 'fria', price: 4500, img: '🩺' },
  { id: 8, title: 'Económico', category: 'paqueteria', price: 500, img: '💰' },
  { id: 9, title: 'Carga 10T', category: 'carga', price: 20000, img: '🛡️' },
  { id: 10, title: 'Interprovincial', category: 'paqueteria', price: 2200, img: '🛣️' },
  { id: 11, title: 'Frío Alimentos', category: 'fria', price: 3200, img: '🍎' },
  { id: 12, title: 'Full Track', category: 'paqueteria', price: 1800, img: '📱' },
];

interface CatalogProps {
  filters?: any;
}

export default function Catalog({ filters = {} }: CatalogProps) {
  const filteredProducts = products.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.price === 'low' && p.price > 1000) return false;
    if (filters.price === 'medium' && (p.price < 1000 || p.price > 5000)) return false;
    if (filters.price === 'high' && p.price <= 5000) return false;
    if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const handleProductClick = (product: any) => {
    alert(`¡Contactar por ${product.title}! WhatsApp: +54 11 1234-5678`);
  };

  return (
    <div className="catalog-grid">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
          <div className="product-icon">{product.img}</div>
          <h3>{product.title}</h3>
          <p className="price">${product.price.toLocaleString()}</p>
          <button className="contact-btn">Contactar</button>
        </div>
      ))}
    </div>
  );
}
