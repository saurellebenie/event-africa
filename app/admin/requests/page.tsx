'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminNav from '@/components/admin/nav'
import ProviderRequests from '@/components/admin/provider-requests'
import { ArrowLeft } from 'lucide-react'

export default function AdminRequestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Provider Requests</h1>
          <p className="text-muted-foreground mt-2">Review and manage provider applications</p>
        </div>

        <ProviderRequests />
      </div>
    </div>
  )
}
