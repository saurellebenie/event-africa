'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface AuthModalProps {
  mode: 'signin' | 'signup' | null
  onClose: () => void
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useI18n()

  if (!mode) return null

  const isSignup = mode === 'signup'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {isSignup ? t('auth.createAccount') : t('auth.signIn')}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t('auth.fullName')}</label>
              <Input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('auth.email')}</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t('auth.password')}</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('auth.loading') : (isSignup ? t('auth.createAccount') : t('auth.signIn'))}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? t('auth.alreadyHaveAccount') : t('auth.noAccount')}{' '}
          <button className="text-primary hover:underline" onClick={onClose}>
            {isSignup ? t('auth.switchSignIn') : t('auth.switchSignUp')}
          </button>
        </div>
      </div>
    </div>
  )
}
