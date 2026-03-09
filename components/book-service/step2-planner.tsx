'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface PlannerFormData {
    supportLevel: string
    eventTheme: string
    totalBudget: string
    vendorHelp: boolean | null
    inspirationFile: File | null
}

interface Step2PlannerProps {
    data: PlannerFormData
    onChange: (data: Partial<PlannerFormData>) => void
}

const SUPPORT_LEVELS = [
    {
        value: 'full',
        label: '🎯 Full Planning',
        desc: 'We handle everything from start to finish',
    },
    {
        value: 'partial',
        label: '🤝 Partial Planning',
        desc: 'We assist with specific aspects of your event',
    },
    {
        value: 'day-of',
        label: '📅 Day-of Coordination',
        desc: 'We manage execution on the event day',
    },
]

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

export default function Step2Planner({ data, onChange }: Step2PlannerProps) {
    return (
        <div className="space-y-7">
            {/* Support Level */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                    Level of Support <span className="text-destructive">*</span>
                </Label>
                <div className="space-y-3">
                    {SUPPORT_LEVELS.map((level) => (
                        <button
                            key={level.value}
                            type="button"
                            onClick={() => onChange({ supportLevel: level.value })}
                            className={cn(
                                'w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200',
                                data.supportLevel === level.value
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-border bg-card hover:border-primary/40'
                            )}
                        >
                            <span className="text-2xl flex-shrink-0">{level.label.split(' ')[0]}</span>
                            <div>
                                <p className={cn('text-sm font-semibold', data.supportLevel === level.value ? 'text-primary' : 'text-foreground')}>
                                    {level.label.split(' ').slice(1).join(' ')}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">{level.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Event Theme */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Event Theme</Label>
                <Input
                    placeholder="e.g., Rustic Elegance, Afro-Luxe, Garden Party, Black Tie..."
                    value={data.eventTheme}
                    onChange={(e) => onChange({ eventTheme: e.target.value })}
                />
            </div>

            {/* Total Budget */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Total Event Budget</Label>
                <Input
                    placeholder="e.g., ₦5,000,000"
                    value={data.totalBudget}
                    onChange={(e) => onChange({ totalBudget: e.target.value })}
                />
            </div>

            {/* Vendor Help */}
            <YesNoToggle
                label="Need Help Finding All Vendors?"
                value={data.vendorHelp}
                onChange={(v) => onChange({ vendorHelp: v })}
            />

            {/* Inspiration Upload */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Inspiration Images (Optional)
                </Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="inspiration-upload"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            onChange({ inspirationFile: file })
                        }}
                    />
                    <label htmlFor="inspiration-upload" className="cursor-pointer">
                        <div className="text-3xl mb-2">🖼️</div>
                        <p className="text-sm font-medium text-foreground mb-1">
                            {data.inspirationFile ? data.inspirationFile.name : 'Upload inspiration images'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP up to 10MB each
                        </p>
                    </label>
                </div>
            </div>
        </div>
    )
}
