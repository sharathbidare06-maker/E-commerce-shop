import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Trash2, Plus, Minus, ShieldCheck } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import api from '../lib/api'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore()
  const user = useAuthStore((state) => state.user)
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const handleCheckout = async () => {
    if (!user?.id) {
      setCheckoutState('error')
      return
    }
    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        productName: i.name,
      }))
      const order = await api.post('/orders', { userId: user.id, items: orderItems, totalAmount: total() })
      await api.post('/payments', {
        orderId: order.data.id,
        userId: user.id,
        amount: total(),
        paymentMethod: 'CARD',
      })
      await api.post('/notifications', {
        userId: user.id,
        type: 'ORDER_CONFIRMATION',
        subject: 'Order confirmed',
        content: `Your order ${order.data.id} has been received.`,
        recipientEmail: user.email,
      })
      clearCart()
      setCheckoutState('success')
    } catch {
      setCheckoutState('error')
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div><Link to="/products" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} /> Continue shopping</Link><h1 className="text-4xl font-bold tracking-tight">Your cart</h1></div>
      {checkoutState === 'error' && <div className="border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-600">Please sign in before checking out, or try again.</div>}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="divide-y divide-slate-200 border bg-white">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-5 sm:gap-6">
            <div className="h-20 w-20 shrink-0 overflow-hidden bg-stone-100">{item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-slate-400">IMG</span>}</div>
            <div className="min-w-0 flex-1"><h3 className="truncate font-bold">{item.name}</h3><p className="font-semibold text-slate-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 border border-slate-200 px-2 py-1">
              <button
                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="text-right">
              <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:text-red-700 mt-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-fit border bg-white p-6 shadow-sm">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Order summary</p>
        <div className="mb-3 flex items-center justify-between text-sm text-slate-500"><span>Subtotal</span><span>${total().toFixed(2)}</span></div>
        <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-5 text-sm text-slate-500"><span>Shipping</span><span className="font-semibold text-emerald-600">Free</span></div>
        <div className="mb-5 flex items-center justify-between"><span className="text-lg font-bold">Total</span><span className="text-2xl font-bold text-slate-900">${total().toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={checkoutState === 'processing'}
          className="w-full bg-rose-500 py-4 font-bold text-white transition hover:bg-rose-600 disabled:opacity-60"
        >
          {checkoutState === 'processing' ? 'Processing...' : 'Place order'}
        </button>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500"><ShieldCheck size={15} className="text-emerald-600" /> Secure checkout</div>
      </div>
      </div>
      {checkoutState === 'success' && <div className="flex items-center gap-3 border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-700"><CheckCircle2 size={20} /> Order placed. Payment and confirmation notification are processing.</div>}
    </div>
  )
}
