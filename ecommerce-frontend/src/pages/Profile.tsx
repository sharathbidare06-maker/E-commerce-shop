import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut, User, Mail } from 'lucide-react'

export default function Profile() {
  const { user, logout } = useAuthStore()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-3xl font-bold">My Profile</h1>
      {!user ? (
        <div className="border bg-white p-8 text-center shadow-sm">
          <p className="mb-5 text-gray-600">Sign in to manage your account and orders.</p>
          <Link to="/login" className="inline-flex bg-slate-900 px-5 py-3 font-semibold text-white">Sign In</Link>
        </div>
      ) : (
        <div className="border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <div className="mt-1 flex items-center gap-2 text-gray-600"><Mail size={16} /><span>{user.email}</span></div>
            </div>
          </div>
          <div className="border-t pt-6">
            <button onClick={logout} className="flex items-center gap-2 font-medium text-red-600 hover:text-red-700"><LogOut size={20} />Sign Out</button>
          </div>
        </div>
      )}
    </div>
  )
}
