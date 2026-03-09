'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DashboardOverview from '@/components/dashboard/overview'
import BookingsTab from '@/components/dashboard/bookings-tab'
import ListingsTab from '@/components/dashboard/listings-tab'
import PaymentsTab from '@/components/dashboard/payments-tab'
import ReviewsTab from '@/components/dashboard/reviews-tab'
import SettingsTab from '@/components/dashboard/settings-tab'
import DashboardNav from '@/components/dashboard/nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardPageProps {
  searchParams?: {
    tab?: string
    status?: string
  }
}

export default function Dashboard({ searchParams }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState(searchParams?.tab || 'overview')
  
  const isKycApproved = true // This should come from auth state/database
  const providerStatus: 'pending' | 'reviewing' | 'approved' | 'rejected' = 'approved'

  // If KYC is not approved, show limited access
  if (!isKycApproved) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-900">
                <AlertCircle className="w-5 h-5" />
                Provider Application Under Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {providerStatus === 'pending' && (
                <>
                  <p className="text-sm text-yellow-800">
                    Your provider application has been submitted and is awaiting review. You can start creating services once your application is approved.
                  </p>
                  <p className="text-xs text-yellow-700">
                    Expected review time: 2-3 business days. You'll receive an email update once your status changes.
                  </p>
                </>
              )}
              {providerStatus === 'reviewing' && (
                <>
                  <p className="text-sm text-yellow-800">
                    Your provider application is currently being reviewed by our team. Please check back soon for updates.
                  </p>
                  <p className="text-xs text-yellow-700">
                    We'll notify you via email as soon as the review is complete.
                  </p>
                </>
              )}
              {providerStatus === 'rejected' && (
                <>
                  <p className="text-sm text-red-800">
                    Unfortunately, your provider application was not approved at this time.
                  </p>
                  <p className="text-xs text-red-700 mb-4">
                    You can review the feedback and submit a new application after addressing the concerns.
                  </p>
                  <Link href="/become-provider">
                    <Button variant="outline">Submit New Application</Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 p-6 border border-border rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-4">What happens next?</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Our team will verify your business documents and information</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>You'll receive an email notification once your account is approved</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Once approved, you can start adding services and accepting bookings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Provider Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your listings, bookings, and earnings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:w-auto bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="listings">Services</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>

          <TabsContent value="listings">
            <ListingsTab />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
