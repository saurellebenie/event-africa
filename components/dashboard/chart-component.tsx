'use client'

export default function ChartComponent() {
  const data = [
    { month: 'Jan', revenue: 40000 },
    { month: 'Feb', revenue: 65000 },
    { month: 'Mar', revenue: 55000 },
    { month: 'Apr', revenue: 75000 },
    { month: 'May', revenue: 85000 },
    { month: 'Jun', revenue: 120000 },
  ]

  const maxRevenue = Math.max(...data.map((d) => d.revenue))

  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((item) => {
        const height = (item.revenue / maxRevenue) * 100
        return (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors" style={{ height: `${height}%` }}>
              <div className="w-full h-full bg-gradient-to-t from-primary to-primary/50 rounded-t hover:from-primary/80 hover:to-primary/60 transition-colors"></div>
            </div>
            <p className="text-xs text-muted-foreground">{item.month}</p>
          </div>
        )
      })}
    </div>
  )
}
