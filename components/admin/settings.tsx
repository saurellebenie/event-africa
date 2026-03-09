'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SettingsIcon, Save } from 'lucide-react'

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/50">
        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <SettingsIcon size={20} />
          Platform Settings
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Commission Rate (%)</label>
            <input type="number" defaultValue="15" className="w-full px-4 py-2 rounded-lg bg-muted border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Minimum Booking Amount</label>
            <input type="text" defaultValue="₦10,000" className="w-full px-4 py-2 rounded-lg bg-muted border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Platform Currency</label>
            <select className="w-full px-4 py-2 rounded-lg bg-muted border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Nigerian Naira (₦)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <input type="checkbox" id="maintenance" className="w-4 h-4" />
            <label htmlFor="maintenance" className="text-sm font-medium text-foreground cursor-pointer">Enable Maintenance Mode</label>
          </div>

          <Button className="w-full gap-2">
            <Save size={16} />
            Save Settings
          </Button>
        </div>
      </Card>

      <Card className="p-6 border border-border/50">
        <h2 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h2>
        
        <div className="space-y-4">
          {[
            { label: 'High-value bookings alert', desc: 'Get notified for bookings above ₦500,000' },
            { label: 'Provider disputes', desc: 'Alerts when disputes are filed' },
            { label: 'System alerts', desc: 'Critical system notifications' },
            { label: 'Daily reports', desc: 'Receive daily platform summary' },
          ].map((pref, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
              <input type="checkbox" id={`pref-${i}`} defaultChecked className="w-4 h-4" />
              <div className="flex-1">
                <label htmlFor={`pref-${i}`} className="text-sm font-medium text-foreground cursor-pointer">{pref.label}</label>
                <p className="text-xs text-muted-foreground mt-1">{pref.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
