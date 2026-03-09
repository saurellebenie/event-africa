'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface CateringFormData {
    cuisineType: string
    serviceStyle: string
    courses: string
    allergies: string
    drinksIncluded: boolean | null
    staffNeeded: boolean | null
    tableware: boolean | null
}

interface Step2CateringProps {
    data: CateringFormData
    onChange: (data: Partial<CateringFormData>) => void
}

const CUISINES = ['West African', 'East African', 'North African', 'Pan-African Fusion', 'Continental', 'Mediterranean', 'Asian', 'International Buffet']
const SERVICE_STYLES = ['Buffet', 'Plated Service', 'Family Style', 'Food Stations', 'Cocktail Reception']

function YesNoToggle({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean) => void }) {
    return (
        <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">{label}</Label>
            <div className="flex gap-2">
                {[true, false].map((opt) => (
                    <button
                        key={String(opt)}
                        type="button"
                        onClick={() => onChange(opt)}
                        className={cn(
                            'flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all duration-200',
                            value === opt
                                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                        )}
                    >
                        {opt ? 'Yes' : 'No'}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function Step2Catering({ data, onChange }: Step2CateringProps) {
    return (
        <div className="space-y-7">
            {/* Cuisine Type */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Cuisine Type</Label>
                <div className="flex flex-wrap gap-2">
                    {CUISINES.map((cuisine) => (
                        <button
                            key={cuisine}
                            type="button"
                            onClick={() => onChange({ cuisineType: cuisine })}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                                data.cuisineType === cuisine
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                            )}
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>

            {/* Service Style */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Service Style</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICE_STYLES.map((style) => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => onChange({ serviceStyle: style })}
                            className={cn(
                                'py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 text-center',
                                data.serviceStyle === style
                                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                            )}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            {/* Number of Courses */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Number of Courses</Label>
                <Select value={data.courses} onValueChange={(v) => onChange({ courses: v })}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Select courses" />
                    </SelectTrigger>
                    <SelectContent>
                        {['2', '3', '4', '5', '6+'].map((n) => (
                            <SelectItem key={n} value={n}>{n} courses</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Yes/No toggles */}
            <div className="grid sm:grid-cols-3 gap-5">
                <YesNoToggle label="Drinks Included?" value={data.drinksIncluded} onChange={(v) => onChange({ drinksIncluded: v })} />
                <YesNoToggle label="Service Staff Needed?" value={data.staffNeeded} onChange={(v) => onChange({ staffNeeded: v })} />
                <YesNoToggle label="Tableware Included?" value={data.tableware} onChange={(v) => onChange({ tableware: v })} />
            </div>

            {/* Allergies */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Food Allergies or Dietary Restrictions
                </Label>
                <Textarea
                    placeholder="e.g., Nut allergy, vegetarian guests, halal requirements, gluten-free..."
                    value={data.allergies}
                    onChange={(e) => onChange({ allergies: e.target.value })}
                    rows={3}
                    className="resize-none"
                />
            </div>
        </div>
    )
}
