'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminNav from '@/components/admin/nav'
import KYCVerificationTab from '@/components/admin/kyc-verification'
import KYCPendingTab from '@/components/admin/kyc-pending'
import KYCApprovedTab from '@/components/admin/kyc-approved'
import KYCRejectedTab from '@/components/admin/kyc-rejected'

export default function KYCDashboard() {
  const [activeTab, setActiveTab] = useState('pending')

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">KYC Verification</h1>
          <p className="text-muted-foreground mt-2">Manage and verify provider profiles and documents</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/50">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="verification">Under Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <KYCPendingTab />
          </TabsContent>

          <TabsContent value="verification">
            <KYCVerificationTab />
          </TabsContent>

          <TabsContent value="approved">
            <KYCApprovedTab />
          </TabsContent>

          <TabsContent value="rejected">
            <KYCRejectedTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
