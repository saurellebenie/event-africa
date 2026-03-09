'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminNav from '@/components/admin/nav'
import AdminOverview from '@/components/admin/overview'
import ProviderRequests from '@/components/admin/provider-requests'
import AdminProviders from '@/components/admin/providers'
import AdminTransactions from '@/components/admin/transactions'
import EarningsAnalytics from '@/components/admin/earnings-analytics'
import CommissionSettings from '@/components/admin/commission-settings'
import { AlertCircle, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface AdminDashboardProps {
  searchParams?: {
    tab?: string
  }
}

export default function AdminDashboard({ searchParams }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState(searchParams?.tab || 'overview')
  const pendingRequests = 2
  
  const isAdmin = true // This should come from auth state/database
  const adminRole: 'admin' | 'moderator' | 'viewer' = 'admin'

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNav />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-8">
              <div className="text-center space-y-4">
                <Lock className="w-12 h-12 text-red-600 mx-auto" />
                <h2 className="text-2xl font-bold text-red-900">Access Denied</h2>
                <p className="text-red-800">
                  You do not have permission to access the admin dashboard.
                </p>
                <Link href="/" className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Return to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Platform analytics and management</p>
        </div>

        {pendingRequests > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                {pendingRequests} pending provider request{pendingRequests > 1 ? 's' : ''} awaiting review
              </p>
              <Link href="/admin/requests" className="text-xs font-medium text-yellow-700 hover:text-yellow-900 underline">
                Review now →
              </Link>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">
              Requests
              {pendingRequests > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {pendingRequests}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="analytics">Earnings</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="requests">
            <ProviderRequests />
          </TabsContent>

          <TabsContent value="providers">
            <AdminProviders />
          </TabsContent>

          <TabsContent value="analytics">
            <EarningsAnalytics />
          </TabsContent>

          <TabsContent value="commissions">
            <CommissionSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
