import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react'
import api from '../lib/api'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string
}

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const { data: products, isLoading } = useQuery(['products', search], async () => {
    const res = await api.get('/products', { params: { search: search || undefined } })
    return res.data as Product[]
  })
  const categories = ['All', ...new Set(products?.map((product) => product.category) ?? [])]
  const filteredProducts = useMemo(() => products?.filter((product) => {
    return category === 'All' || product.category === category
  }), [products, search, category])

  if (isLoading) return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-80 animate-pulse bg-white" />)}</div>

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-500">Shop the edit</p><h1 className="text-4xl font-bold tracking-tight">All products</h1></div>
        <p className="max-w-xs text-sm leading-relaxed text-slate-500">Small upgrades for a more considered everyday.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block flex-1"><Search size={17} className="absolute left-3 top-3.5 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="w-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-900" /></label>
        <div className="flex items-center gap-2 overflow-x-auto border border-slate-200 bg-white px-3"><SlidersHorizontal size={16} className="shrink-0 text-slate-400" />{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`shrink-0 px-2 py-2 text-xs font-bold ${category === item ? 'text-rose-500' : 'text-slate-500 hover:text-slate-900'}`}>{item}</button>)}</div>
      </div>
      {!filteredProducts?.length && <p className="py-16 text-center text-slate-500">No products match your search.</p>}
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts?.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
          >
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-stone-100">
              {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <span className="text-sm text-slate-400">Image coming soon</span>}
              <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">{product.category}</span>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={17} /></span>
            </div>
            <div className="space-y-3 p-4">
              <h3 className="font-bold text-slate-900">{product.name}</h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">{product.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
                <span className={`text-xs font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>{product.stock > 0 ? 'In stock' : 'Sold out'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
