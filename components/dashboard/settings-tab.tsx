'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function SettingsTab() {
  const [formData, setFormData] = useState({
    companyName: 'Crystal Venue Nairobi',
    email: 'info@crystalvenue.com',
    phone: '+254 700 123 456',
    location: 'Nairobi, Kenya',
    bio: 'Stunning luxury venue perfect for weddings and corporate events',
    bankAccount: '1234567890',
    accountHolder: 'Crystal Venue Ltd',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('Settings saved:', formData)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Business Information</h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name
              </label>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Payment Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bank Account Number
            </label>
            <Input
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Account Holder Name
            </label>
            <Input
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button onClick={handleSave} className="gap-2">
          Save Changes
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
