import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, UserRound, Package, Home, Search, Plus, Heart, Boxes } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const location = useLocation()
  const cartCount = useCartStore((s) => s.items.reduce((count, item) => count + item.quantity, 0))
  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/products', label: 'Shop', icon: Package },
    { to: '/orders', label: 'Orders', icon: Package },
    { to: '/admin/products', label: 'Add product', icon: Plus },
    { to: '/wishlist', label: 'Wishlist', icon: Heart },
    { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-stone-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
            Azure<span className="text-rose-500">Shop</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${location.pathname === to ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}>
                <Icon size={16} /> {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/products" aria-label="Search products" title="Search products" className="hidden rounded-full p-2.5 text-slate-500 transition hover:bg-white hover:text-slate-900 sm:block">
              <Search size={19} />
            </Link>
            <Link to="/profile" aria-label="Profile" title="Profile" className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:border-slate-900 hover:text-slate-900">
              <UserRound size={18} />
            </Link>
            <Link to="/cart" aria-label={`Cart, ${cartCount} items`} title="Cart" className="relative rounded-full bg-rose-500 p-2.5 text-white transition hover:bg-rose-600">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-stone-50 bg-slate-900 px-1 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-slate-200/70 px-5 py-2 md:hidden">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`shrink-0 px-3 py-2 text-xs font-bold ${location.pathname === to ? 'text-slate-900' : 'text-slate-500'}`}>{label}</Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 lg:px-8 lg:py-12">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-slate-900 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 text-sm text-slate-300 sm:flex-row lg:px-8">
          <p className="font-semibold text-white">Azure<span className="text-rose-400">Shop</span></p>
          <p>Thoughtful goods, delivered simply.</p>
        </div>
      </footer>
    </div>
  )
}
