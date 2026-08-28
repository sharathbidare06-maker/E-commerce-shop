import { useQuery } from 'react-query'
import { Package, Clock, CheckCircle } from 'lucide-react'
import api from '../lib/api'
import { useAuthStore } from '../store/authStore'

interface Order {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  items: Array<{
    productName: string
    quantity: number
    price: number
  }>
}

export default function Orders() {
  const user = useAuthStore((state) => state.user)
  const { data: orders, isLoading } = useQuery(['orders', user?.id], async () => {
    const res = await api.get(`/orders/user/${user?.id}`)
    return res.data as Order[]
  }, { enabled: Boolean(user?.id), refetchInterval: 10000 })

  if (isLoading) return <div className="text-center py-12">Loading orders...</div>

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="border-b border-slate-200 pb-6"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-500">Live order tracking</p><h1 className="text-4xl font-bold tracking-tight">My orders</h1><p className="mt-3 text-sm text-slate-500">Order status refreshes automatically.</p></div>
      {!user && (
        <div className="text-center py-12 text-gray-500">Sign in to view your orders</div>
      )}
      {user && orders?.length === 0 && (
        <div className="text-center py-12 text-gray-500">No orders yet</div>
      )}
      <div className="space-y-4">
        {orders?.map((order) => (
          <div key={order.id} className="border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Package className="text-rose-500" size={24} />
                <div>
                  <div className="font-semibold">Order #{order.id.slice(-8)}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {order.status === 'DELIVERED' ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <Clock className="text-yellow-500" size={20} />
                )}
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold tracking-wide text-amber-700">{order.status}</span>
              </div>
            </div>
            <div className="border-t pt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span>
                    {item.productName} x{item.quantity}
                  </span>
                  <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span className="text-slate-900">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
