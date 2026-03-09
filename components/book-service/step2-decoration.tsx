'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Palette, Flower, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DecorationFormData {
    style: string
    theme: string
    colorPalette: string
    setting: 'indoor' | 'outdoor' | 'both' | ''
    items: {
        stage: boolean
        table: boolean
        floral: boolean
        balloon: boolean
        backdrop: boolean
        lighting: boolean
        entrance: boolean
        photoBooth: boolean
        signage: boolean
    }
    services: {
        setupDismantle: boolean
    }
    venueAccessTime: string
    budget: string
    inspirationFile: File | null
}

interface Step2DecorationProps {
    data: DecorationFormData
    onChange: (data: Partial<DecorationFormData>) => void
}

const STYLES = [
    'Modern', 'Luxury', 'Rustic', 'Floral', 'Minimalist', 'Traditional', 'Vintage', 'Bohemian', 'Themed', 'Other'
]

const DECOR_ITEMS = [
    { key: 'stage', label: 'Stage Decoration' },
    { key: 'table', label: 'Table Centerpieces' },
    { key: 'floral', label: 'Floral Arrangements' },
    { key: 'backdrop', label: 'Photo Backdrop' },
    { key: 'balloon', label: 'Balloon Decor' },
    { key: 'lighting', label: 'Ambient Lighting' },
    { key: 'entrance', label: 'Entrance Arch/Decor' },
    { key: 'photoBooth', label: 'Photo Booth Setup' },
    { key: 'signage', label: 'Custom Signage' },
]

export default function Step2Decoration({ data, onChange }: Step2DecorationProps) {
    const handleItemChange = (key: keyof DecorationFormData['items'], checked: boolean) => {
        onChange({
            items: { ...data.items, [key]: checked }
        })
    }

    const handleServiceChange = (key: keyof DecorationFormData['services'], checked: boolean) => {
        onChange({
            services: { ...data.services, [key]: checked }
        })
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Style & Theme */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label>Decoration Style <span className="text-destructive">*</span></Label>
                    <Select value={data.style} onValueChange={(v) => onChange({ style: v })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                            {STYLES.map((s) => (
                                <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-3">
                    <Label>Event Theme</Label>
                    <Input
                        placeholder="e.g. Great Gatsby, Tropical, Royal..."
                        value={data.theme}
                        onChange={(e) => onChange({ theme: e.target.value })}
                    />
                </div>
            </div>

            {/* Colors & Setting */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label>Preferred Color Palette</Label>
                    <div className="relative">
                        <Input
                            placeholder="e.g. Gold & White, Pastel Pink..."
                            value={data.colorPalette}
                            onChange={(e) => onChange({ colorPalette: e.target.value })}
                            className="pl-9"
                        />
                        <Palette className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    </div>
                </div>
                <div className="space-y-3">
                    <Label>Setting <span className="text-destructive">*</span></Label>
                    <Select value={data.setting} onValueChange={(v: any) => onChange({ setting: v })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Indoor or Outdoor?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="indoor">Indoor</SelectItem>
                            <SelectItem value="outdoor">Outdoor</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Decor Items (Checkboxes) */}
            <div className="space-y-4">
                <Label className="text-base">What items do you need? <span className="text-destructive">*</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DECOR_ITEMS.map((item) => (
                        <div
                            key={item.key}
                            className={cn(
                                "flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/50",
                                data.items[item.key as keyof typeof data.items] ? "border-primary/50 bg-primary/5 shadow-sm" : "border-border"
                            )}
                            onClick={() => handleItemChange(item.key as keyof DecorationFormData['items'], !data.items[item.key as keyof DecorationFormData['items']])}
                        >
                            <Checkbox
                                checked={data.items[item.key as keyof DecorationFormData['items']]}
                                onCheckedChange={(checked) => handleItemChange(item.key as keyof DecorationFormData['items'], checked as boolean)}
                            />
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Services & Logistics */}
            <div className="grid sm:grid-cols-2 gap-6 bg-muted/30 p-4 rounded-xl border border-border/50">
                <div className="space-y-3">
                    <Label>Logistics</Label>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="setup"
                            checked={data.services.setupDismantle}
                            onCheckedChange={(c) => handleServiceChange('setupDismantle', c as boolean)}
                        />
                        <label htmlFor="setup" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Setup & Dismantling Required
                        </label>
                    </div>
                </div>
                <div className="space-y-3">
                    <Label>Venue Access Time (for setup)</Label>
                    <Input
                        type="time"
                        value={data.venueAccessTime}
                        onChange={(e) => onChange({ venueAccessTime: e.target.value })}
                    />
                </div>
            </div>

            {/* Budget & Upload */}
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label>Estimated Decoration Budget</Label>
                    <Input
                        type="number"
                        placeholder="e.g. 50000"
                        value={data.budget}
                        onChange={(e) => onChange({ budget: e.target.value })}
                    />
                </div>

                <div className="space-y-3">
                    <Label>Inspiration / Mood Board (Optional)</Label>
                    <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-8 text-center cursor-pointer bg-card">
                        <input
                            type="file"
                            className="hidden"
                            id="mood-upload"
                            accept="image/*,.pdf"
                            onChange={(e) => onChange({ inspirationFile: e.target.files?.[0] || null })}
                        />
                        <label htmlFor="mood-upload" className="cursor-pointer flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Upload className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium">Click to upload inspiration photos</p>
                                <p className="text-xs text-muted-foreground">JPG, PNG or PDF (max 5MB)</p>
                            </div>
                            {data.inspirationFile && (
                                <div className="mt-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                    {data.inspirationFile.name}
                                </div>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
