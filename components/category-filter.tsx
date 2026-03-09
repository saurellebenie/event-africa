'use client'

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; icon: string }>
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            selectedCategory === category.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-foreground hover:border-primary/50'
          }`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  )
}
