'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell, Settings, LogOut, BarChart3, ArrowLeft } from 'lucide-react'

export default function AdminNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-muted rounded-lg transition-colors" title="Back to provider dashboard">
              <ArrowLeft size={20} className="text-foreground" />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground hidden sm:inline">Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings size={20} className="text-foreground" />
            </button>
            <Button variant="outline" size="sm" className="gap-2">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
