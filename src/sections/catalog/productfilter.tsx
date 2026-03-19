import { useState } from 'react';

interface FilterProps {
  onFilter: (filters: any) => void;
}

export default function ProductFilter({ onFilter }: FilterProps) {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [search, setSearch] = useState('');

  const applyFilter = () => {
    onFilter({ category, price, search });
  };

  return (
    <div className="product-filter">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="paqueteria">Paquetería</option>
        <option value="carga">Carga Pesada</option>
        <option value="fria">Cadena de Frío</option>
      </select>
      <select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value="">Todos los precios</option>
        <option value="low">Menor a $1000</option>
        <option value="medium">$1000 - $5000</option>
        <option value="high">Mayor a $5000</option>
      </select>
      <button onClick={applyFilter}>Filtrar</button>
    </div>
  );
}
