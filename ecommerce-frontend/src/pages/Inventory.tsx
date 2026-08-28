import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PackageCheck } from 'lucide-react'
import api from '../lib/api'

interface Product { id: string; name: string; category: string; stock: number }
export default function Inventory() {
  const client = useQueryClient()
  const [threshold, setThreshold] = useState(5)
  const { data, isLoading } = useQuery(['low-stock', threshold], async () => (await api.get('/products/inventory/low-stock', { params: { threshold } })).data as Product[])
  const update = useMutation(({ id, quantity }: { id: string; quantity: number }) => api.patch(`/products/${id}/stock`, null, { params: { quantity } }), { onSuccess: () => { client.invalidateQueries(['low-stock']); client.invalidateQueries('products') } })
  return <div className="space-y-8"><div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-500">Operations</p><h1 className="text-4xl font-bold">Inventory</h1></div><label className="text-sm font-semibold">Low-stock threshold<input type="number" min="0" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} className="ml-3 w-20 border border-slate-200 px-3 py-2" /></label></div>{isLoading && <p>Loading inventory...</p>}<div className="divide-y border bg-white">{data?.map((product) => <div key={product.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold">{product.name}</p><p className="text-sm text-slate-500">{product.category} · {product.stock} remaining</p></div><div className="flex items-center gap-2"><input aria-label={`Stock for ${product.name}`} type="number" min="0" defaultValue={product.stock} className="w-24 border border-slate-200 px-3 py-2" onBlur={(event) => update.mutate({ id: product.id, quantity: Number(event.target.value) })} /><PackageCheck size={18} className="text-emerald-600" /></div></div>)}{!isLoading && !data?.length && <p className="p-8 text-center text-emerald-600">All products are above the threshold.</p>}</div></div>
}
