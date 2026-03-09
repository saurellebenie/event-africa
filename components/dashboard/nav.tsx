'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell, Settings, LogOut, Menu, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export default function DashboardNav() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">E</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">EvenIA</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/admin" className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <BarChart3 size={18} />
              Admin Panel
            </Link>
            
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
