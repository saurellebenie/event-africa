'use client'

import { Card } from '@/components/ui/card'
import { Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminTransactions() {
  const transactions = [
    { id: 'TXN-001', provider: 'DJ Collective Lagos', amount: '₦500,000', date: 'Dec 10, 2024', status: 'Completed', type: 'Payout' },
    { id: 'TXN-002', user: 'Amara Okonkwo', amount: '₦850,000', date: 'Dec 11, 2024', status: 'Completed', type: 'Booking' },
    { id: 'TXN-003', provider: 'Luxury Venues Ltd', amount: '₦2,100,000', date: 'Dec 12, 2024', status: 'Pending', type: 'Payout' },
    { id: 'TXN-004', user: 'Tunde Adeleke', amount: '₦450,000', date: 'Dec 13, 2024', status: 'Completed', type: 'Booking' },
    { id: 'TXN-005', provider: 'Catering Experts', amount: '₦750,000', date: 'Dec 14, 2024', status: 'Failed', type: 'Payout' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/10 text-green-600'
      case 'Pending': return 'bg-yellow-500/10 text-yellow-600'
      case 'Failed': return 'bg-red-500/10 text-red-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-left text-sm font-semibold text-muted-foreground">
                <th className="pb-4 px-4">Transaction ID</th>
                <th className="pb-4 px-4">Party</th>
                <th className="pb-4 px-4">Amount</th>
                <th className="pb-4 px-4">Date</th>
                <th className="pb-4 px-4">Type</th>
                <th className="pb-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4 font-mono text-sm text-foreground">{txn.id}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{txn.provider || txn.user}</td>
                  <td className="py-4 px-4 font-bold text-green-600">{txn.amount}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{txn.date}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{txn.type}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(txn.status)}`}>
                      {txn.status}
                    </span>
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
