'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Bell, User, LogOut, Home, Store, BarChart3, Settings, ChevronDown, FileText, Sun, Moon } from 'lucide-react'
import { useI18n, LanguageSwitcher } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

interface NavigationProps {
  onAuthClick?: (mode: 'signin' | 'signup') => void
  isAuthenticated?: boolean
  userType?: 'customer' | 'provider' | 'admin'
  userName?: string
}

export default function Navigation({
  onAuthClick = () => { },
  isAuthenticated = false,
  userType = 'customer',
  userName = 'User'
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notificationCount] = useState(3)
  const { t, locale } = useI18n()
  const { resolvedTheme, setTheme } = useTheme()

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setProfileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={closeMenus}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">EvenIA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              {t('nav.home')}
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Store className="w-4 h-4" />
              {t('nav.services')}
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.pricing')}
            </Link>
            {!isAuthenticated && (
              <Link
                href="/become-provider"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.becomeProvider')}
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <LanguageSwitcher />

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium hidden sm:inline text-foreground">{userName}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:inline" />
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg py-2">
                      {userType === 'customer' && (
                        <>
                          <div className="px-4 py-2 border-b border-border">
                            <p className="text-xs text-muted-foreground font-medium">{t('nav.customer')}</p>
                          </div>
                          <Link
                            href="/marketplace"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <Store className="w-4 h-4" />
                            {t('nav.browseServices')}
                          </Link>
                        </>
                      )}

                      {userType === 'provider' && (
                        <>
                          <div className="px-4 py-2 border-b border-border">
                            <p className="text-xs text-muted-foreground font-medium">{t('nav.provider')}</p>
                          </div>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <BarChart3 className="w-4 h-4" />
                            {t('nav.dashboard')}
                          </Link>
                          <Link
                            href="/dashboard?tab=listings"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <Store className="w-4 h-4" />
                            {t('nav.myServices')}
                          </Link>
                        </>
                      )}

                      {userType === 'admin' && (
                        <>
                          <div className="px-4 py-2 border-b border-border">
                            <p className="text-xs text-muted-foreground font-medium">{t('nav.admin')}</p>
                          </div>
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <BarChart3 className="w-4 h-4" />
                            {t('nav.dashboard')}
                          </Link>
                          <Link
                            href="/admin/requests"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <FileText className="w-4 h-4" />
                            {t('nav.providerRequests')}
                          </Link>
                        </>
                      )}

                      <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Home className="w-4 h-4" />
                        {t('nav.home')}
                      </Link>
                      <Link
                        href="/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        {t('nav.settings')}
                      </Link>
                      <button
                        className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/5 transition-colors w-full text-left border-t border-border"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.signOut')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-sm hidden sm:inline-flex"
                  onClick={() => onAuthClick('signin')}
                >
                  {t('nav.signIn')}
                </Button>
                <Button
                  className="text-sm"
                  onClick={() => onAuthClick('signup')}
                >
                  {t('nav.getStarted')}
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              {t('nav.home')}
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Store className="w-4 h-4" />
              {t('nav.services')}
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.pricing')}
            </Link>
            {!isAuthenticated && (
              <Link
                href="/become-provider"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="w-4 h-4" />
                {t('nav.becomeProvider')}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
