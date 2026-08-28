import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Headphones } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden bg-slate-900 px-6 py-16 text-white sm:px-12 lg:px-20 lg:py-24">
        <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[url('https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center opacity-70 lg:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/20 lg:from-slate-900 lg:via-slate-900/90" />
        <div className="relative max-w-2xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-rose-300">The everyday edit</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-6xl">Good things,<br /><span className="text-rose-300">beautifully simple.</span></h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-300">A considered collection for work, home, and everywhere in between.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-rose-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-rose-300"
        >
          Explore the collection <ArrowRight size={18} />
        </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 border-y border-slate-200 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: ShoppingBag, title: 'Curated goods', desc: 'Useful pieces, chosen with care' },
          { icon: Truck, title: 'Fast shipping', desc: 'Free delivery on orders over $50' },
          { icon: ShieldCheck, title: 'Secure checkout', desc: 'Payments protected end to end' },
          { icon: Headphones, title: 'Here to help', desc: 'Real support whenever you need it' },
        ].map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <feature.icon className="shrink-0 text-rose-500" size={24} />
            <div><h3 className="mb-1 font-bold">{feature.title}</h3><p className="text-sm text-slate-500">{feature.desc}</p></div>
          </div>
        ))}
      </section>
    </div>
  )
}
