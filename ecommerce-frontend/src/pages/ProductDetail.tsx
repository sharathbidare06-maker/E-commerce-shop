import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useState } from 'react'
import { ArrowLeft, Check, Heart, ShoppingCart, Star, Truck } from 'lucide-react'
import api from '../lib/api'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string
}
interface Review { id: string; userName: string; rating: number; comment: string }

export default function ProductDetail() {
  const { id } = useParams()
  const addItem = useCartStore((s) => s.addItem)
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()
  const [added, setAdded] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const { data: product, isLoading } = useQuery(['product', id], async () => {
    const res = await api.get(`/products/${id}`)
    return res.data as Product
  })
  const { data: reviews } = useQuery(['reviews', id], async () => (await api.get(`/reviews/product/${id}`)).data as Review[], { enabled: !!id })
  const saveWishlist = useMutation(() => api.post('/wishlist', { userId: user?.id, productId: product?.id, productName: product?.name }), { onSuccess: () => queryClient.invalidateQueries(['wishlist', user?.id]) })
  const addReview = useMutation(() => api.post('/reviews', { productId: id, userId: user?.id, userName: user?.name, rating, comment }), { onSuccess: () => { setComment(''); queryClient.invalidateQueries(['reviews', id]) } })

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (!product) return <div className="text-center py-12">Product not found</div>

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} /> Back to products</Link>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden bg-stone-100 lg:aspect-auto lg:h-[560px]">
            {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-gray-400">No Image</span>}
          </div>
          <div className="flex flex-col justify-center">
            <span className="w-fit bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-rose-500">
              {product.category}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">{product.name}</h1>
            <p className="mt-5 max-w-lg leading-relaxed text-slate-500">{product.description}</p>
            <div className="mt-8 text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</div>
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <Truck size={17} /> {product.stock > 0 ? `In stock · ${product.stock} available` : 'Out of stock'}
            </div>
            <button
              type="button"
              onClick={() => { addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.imageUrl,
                }); setAdded(true) }}
              disabled={product.stock === 0}
              className="mt-8 flex w-full items-center justify-center gap-2 bg-slate-900 py-4 font-bold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {added ? <Check size={20} /> : <ShoppingCart size={20} />}
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
            {user && <button type="button" onClick={() => saveWishlist.mutate()} disabled={saveWishlist.isLoading} className="mt-3 flex w-full items-center justify-center gap-2 border border-slate-200 py-3 font-bold text-slate-700 hover:border-rose-500 hover:text-rose-500"><Heart size={18} />{saveWishlist.isLoading ? 'Saving...' : 'Save to wishlist'}</button>}
            {added && <Link to="/cart" className="mt-3 text-center text-sm font-bold text-rose-500 hover:text-slate-900">View cart</Link>}
          </div>
      </div>
      <section className="border-t border-slate-200 pt-10">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Reviews</h2><span className="text-sm text-slate-500">{reviews?.length ?? 0} reviews</span></div>
        {user && <form onSubmit={(event) => { event.preventDefault(); if (comment.trim()) addReview.mutate() }} className="mt-5 flex flex-col gap-3 border bg-white p-5 sm:flex-row sm:items-end"><label className="text-sm font-semibold">Rating<select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="mt-1 block border border-slate-200 px-3 py-2">{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></label><label className="flex-1 text-sm font-semibold">Your review<textarea required value={comment} onChange={(event) => setComment(event.target.value)} className="mt-1 block min-h-10 w-full border border-slate-200 px-3 py-2" /></label><button type="submit" disabled={addReview.isLoading} className="bg-slate-900 px-4 py-3 font-bold text-white">Post review</button></form>}
        <div className="mt-5 space-y-3">{reviews?.map((review) => <article key={review.id} className="border-b border-slate-200 py-4"><div className="flex items-center gap-2"><span className="font-bold">{review.userName || 'Customer'}</span><span className="flex text-amber-500">{Array.from({ length: review.rating }, (_, index) => <Star key={`${review.id}-star-${index + 1}`} size={14} fill="currentColor" />)}</span></div><p className="mt-2 text-slate-600">{review.comment}</p></article>)}</div>
      </section>
    </div>
  )
}
