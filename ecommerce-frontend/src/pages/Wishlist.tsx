import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { Heart, Trash2 } from 'lucide-react'
import api from '../lib/api'
import { useAuthStore } from '../store/authStore'

interface WishlistItem { id: string; productId: string; productName: string }

export default function Wishlist() {
  const user = useAuthStore((state) => state.user)
  const client = useQueryClient()
  const { data: items, isLoading } = useQuery(['wishlist', user?.id], async () => (await api.get('/wishlist', { params: { userId: user?.id } })).data as WishlistItem[], { enabled: !!user })
  const remove = useMutation((productId: string) => api.delete('/wishlist', { params: { userId: user?.id, productId } }), { onSuccess: () => client.invalidateQueries(['wishlist', user?.id]) })

  if (!user) return <div className="mx-auto max-w-xl border bg-white p-10 text-center"><Heart className="mx-auto mb-4 text-rose-500" size={30} /><h1 className="text-3xl font-bold">Your wishlist</h1><p className="my-4 text-slate-500">Sign in to keep products close.</p><Link to="/login" className="inline-flex bg-slate-900 px-5 py-3 font-bold text-white">Sign in</Link></div>
  return <div className="space-y-8"><div className="border-b border-slate-200 pb-6"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-500">Saved for later</p><h1 className="text-4xl font-bold">Wishlist</h1></div>{isLoading && <p>Loading...</p>}{!isLoading && !items?.length && <p className="py-12 text-center text-slate-500">Nothing saved yet.</p>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items?.map((item) => <div key={item.id} className="flex items-center justify-between border bg-white p-5"><Link to={`/products/${item.productId}`} className="font-bold hover:text-rose-500">{item.productName || 'View product'}</Link><button type="button" aria-label={`Remove ${item.productName}`} title="Remove from wishlist" onClick={() => remove.mutate(item.productId)} className="p-2 text-slate-400 hover:text-rose-500"><Trash2 size={17} /></button></div>)}</div></div>
}
