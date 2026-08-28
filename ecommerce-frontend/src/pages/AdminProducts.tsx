import { FormEvent, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Plus } from 'lucide-react'
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

interface ProductForm {
  name: string
  description: string
  price: string
  stock: string
  category: string
  imageUrl: string
}

const initialForm: ProductForm = { name: '', description: '', price: '', stock: '', category: '', imageUrl: '' }

export default function AdminProducts() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const { data: products } = useQuery('admin-products', async () => (await api.get('/products')).data as Product[])
  const createProduct = useMutation(
    async (values: ProductForm) => api.post('/products', {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      stock: Number(values.stock),
      category: values.category,
      imageUrl: values.imageUrl,
    }),
    {
      onSuccess: () => {
        setForm(initialForm)
        setMessage('Product added successfully.')
        queryClient.invalidateQueries('admin-products')
        queryClient.invalidateQueries('products')
      },
      onError: () => setMessage('Could not add product. Check the fields and try again.'),
    }
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    createProduct.mutate(form)
  }

  function updateField(field: keyof ProductForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-500">Catalog management</p>
        <h1 className="text-4xl font-bold tracking-tight">Add a product</h1>
        <p className="mt-3 text-slate-500">Create a product and publish it to the live storefront.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
        <form onSubmit={handleSubmit} className="space-y-5 border bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold">Product name<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label>
          <label className="block text-sm font-semibold">Description<textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} className="mt-1 min-h-24 w-full border border-slate-200 px-3 py-3" /></label>
          <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold">Price<input required min="0.01" step="0.01" type="number" value={form.price} onChange={(event) => updateField('price', event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label><label className="block text-sm font-semibold">Stock<input required min="0" step="1" type="number" value={form.stock} onChange={(event) => updateField('stock', event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label></div>
          <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold">Category<input required value={form.category} onChange={(event) => updateField('category', event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label><label className="block text-sm font-semibold">Image URL<input type="url" value={form.imageUrl} onChange={(event) => updateField('imageUrl', event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label></div>
          {message && <p className="text-sm font-semibold text-emerald-600">{message}</p>}
          <button disabled={createProduct.isLoading} className="inline-flex items-center gap-2 bg-slate-900 px-5 py-3 font-bold text-white disabled:opacity-50"><Plus size={17} />{createProduct.isLoading ? 'Adding...' : 'Add product'}</button>
        </form>
        <section className="space-y-4"><h2 className="text-xl font-bold">Live catalog</h2>{products?.slice(0, 6).map((product) => <div key={product.id} className="flex items-center justify-between border-b border-slate-200 py-3"><div><p className="font-semibold">{product.name}</p><p className="text-sm text-slate-500">{product.category} · {product.stock} in stock</p></div><span className="font-bold">${product.price.toFixed(2)}</span></div>)}</section>
      </div>
    </div>
  )
}