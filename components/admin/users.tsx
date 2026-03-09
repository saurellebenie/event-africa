'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Mail, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')

  const users = [
    { id: 1, name: 'Amara Okonkwo', email: 'amara@gmail.com', joinDate: 'Oct 15, 2024', bookings: 12, spent: '₦4,500,000' },
    { id: 2, name: 'Chukwu Ibrahim', email: 'chukwu@gmail.com', joinDate: 'Aug 22, 2024', bookings: 5, spent: '₦1,200,000' },
    { id: 3, name: 'Zainab Hassan', email: 'zainab@gmail.com', joinDate: 'Nov 1, 2024', bookings: 8, spent: '₦2,800,000' },
    { id: 4, name: 'Tunde Adeleke', email: 'tunde@gmail.com', joinDate: 'Sep 10, 2024', bookings: 15, spent: '₦5,600,000' },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-left text-sm font-semibold text-muted-foreground">
                <th className="pb-4 px-4">User</th>
                <th className="pb-4 px-4">Email</th>
                <th className="pb-4 px-4">Join Date</th>
                <th className="pb-4 px-4">Bookings</th>
                <th className="pb-4 px-4">Total Spent</th>
                <th className="pb-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-foreground">{user.name}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{user.joinDate}</td>
                  <td className="py-4 px-4 text-sm font-medium text-foreground">{user.bookings}</td>
                  <td className="py-4 px-4 font-medium text-green-600">{user.spent}</td>
                  <td className="py-4 px-4">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
