'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Store, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { mockStoreProducts } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

export default function StorePage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const addToCart = (id: string) => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeFromCart = (id: string) => setCart(p => { const n = { ...p }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const cartTotal = Object.entries(cart).reduce((t, [id, qty]) => t + (mockStoreProducts.find(p => p.id === id)?.price || 0) * qty, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Store size={24} /> Artist Store</h1>
        {Object.keys(cart).length > 0 && (
          <button className="px-4 py-2 bg-gold-500 text-henna-900 rounded-full text-sm font-semibold flex items-center gap-2">
            <ShoppingCart size={16} /> Cart ({Object.values(cart).reduce((a, b) => a + b, 0)}) · {formatPrice(cartTotal)}
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStoreProducts.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-cream-200 overflow-hidden hover-lift">
            <div className="relative h-40"><Image src={p.image} alt={p.name} fill className="object-cover" />
              {!p.inStock && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">Out of Stock</span></div>}
            </div>
            <div className="p-4">
              <span className="px-2 py-0.5 bg-cream-100 text-henna-600 text-[10px] rounded-full font-medium capitalize">{p.category}</span>
              <h3 className="font-semibold text-henna-800 text-sm mt-1.5 line-clamp-2">{p.name}</h3>
              <div className="flex items-center gap-1 mt-1"><Star size={12} className="fill-gold-500 text-gold-500" /><span className="text-xs text-henna-600">{p.rating} ({p.reviews})</span></div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-bold text-henna-700">{formatPrice(p.price)}</p>
                {cart[p.id] ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(p.id)} className="w-7 h-7 bg-cream-100 rounded-full flex items-center justify-center hover:bg-cream-200"><Minus size={14} /></button>
                    <span className="text-sm font-bold w-4 text-center">{cart[p.id]}</span>
                    <button onClick={() => addToCart(p.id)} className="w-7 h-7 bg-gold-100 rounded-full flex items-center justify-center hover:bg-gold-200"><Plus size={14} /></button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(p.id)} disabled={!p.inStock}
                    className="px-4 py-1.5 bg-henna-700 text-cream-100 text-xs rounded-full font-medium hover:bg-henna-600 disabled:opacity-50">Add to Cart</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
