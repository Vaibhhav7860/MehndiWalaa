'use client';
import { Store, Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { mockStoreProducts } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

export default function AdminStorePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-henna-700 flex items-center gap-2"><Store size={24} /> Store Catalog</h1>
        <button className="px-4 py-2 bg-henna-700 text-cream-100 rounded-full text-sm font-semibold flex items-center gap-1"><Plus size={14} /> Add Product</button>
      </div>
      <div className="bg-white rounded-2xl border border-cream-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-cream-50 border-b border-cream-200">
            <th className="text-left px-4 py-3 text-henna-600 font-medium">Product</th>
            <th className="text-left px-4 py-3 text-henna-600 font-medium">Category</th>
            <th className="text-left px-4 py-3 text-henna-600 font-medium">Price</th>
            <th className="text-center px-4 py-3 text-henna-600 font-medium">Stock</th>
            <th className="text-center px-4 py-3 text-henna-600 font-medium">Actions</th>
          </tr></thead>
          <tbody>
            {mockStoreProducts.map(p => (
              <tr key={p.id} className="border-b border-cream-100 hover:bg-cream-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"><Image src={p.image} alt={p.name} width={40} height={40} className="object-cover" /></div>
                  <span className="font-medium text-henna-800 line-clamp-1">{p.name}</span>
                </td>
                <td className="px-4 py-3 capitalize text-henna-600">{p.category}</td>
                <td className="px-4 py-3 font-semibold text-henna-800">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 text-henna-400 hover:text-blue-500"><Edit size={14} /></button>
                    <button className="p-1.5 text-henna-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
