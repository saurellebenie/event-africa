'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface VenueFormData {
    minCapacity: string
    setting: string
    parkingNeeded: boolean | null
    airConditioning: boolean | null
    soundSystem: boolean | null
    decorationIncluded: boolean | null
    accessibilityRequired: boolean | null
}

interface Step2VenueProps {
    data: VenueFormData
    onChange: (data: Partial<VenueFormData>) => void
}

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

const SETTINGS = [
    { value: 'indoor', label: '🏛️ Indoor', desc: 'Enclosed space' },
    { value: 'outdoor', label: '🌿 Outdoor', desc: 'Open air' },
    { value: 'both', label: '🔄 Both', desc: 'Indoor & outdoor' },
]

export default function Step2Venue({ data, onChange }: Step2VenueProps) {
    return (
        <div className="space-y-7">
            {/* Minimum Capacity */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Minimum Capacity Required
                </Label>
                <Input
                    type="number"
                    placeholder="e.g., 200"
                    value={data.minCapacity}
                    onChange={(e) => onChange({ minCapacity: e.target.value })}
                    min="1"
                    className="w-full sm:w-48"
                />
            </div>

            {/* Indoor / Outdoor */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Venue Setting</Label>
                <div className="grid grid-cols-3 gap-3">
                    {SETTINGS.map((s) => (
                        <button
                            key={s.value}
                            type="button"
                            onClick={() => onChange({ setting: s.value })}
                            className={cn(
                                'flex flex-col items-center gap-1 py-4 px-3 rounded-xl border-2 text-center transition-all duration-200',
                                data.setting === s.value
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-border bg-card hover:border-primary/40'
                            )}
                        >
                            <span className="text-2xl">{s.label.split(' ')[0]}</span>
                            <span className={cn('text-sm font-semibold', data.setting === s.value ? 'text-primary' : 'text-foreground')}>
                                {s.label.split(' ').slice(1).join(' ')}
                            </span>
                            <span className="text-xs text-muted-foreground">{s.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Yes/No toggles */}
            <div className="grid sm:grid-cols-2 gap-5">
                <YesNoToggle label="Parking Needed?" value={data.parkingNeeded} onChange={(v) => onChange({ parkingNeeded: v })} />
                <YesNoToggle label="Air Conditioning?" value={data.airConditioning} onChange={(v) => onChange({ airConditioning: v })} />
                <YesNoToggle label="Sound System Included?" value={data.soundSystem} onChange={(v) => onChange({ soundSystem: v })} />
                <YesNoToggle label="Decoration Included?" value={data.decorationIncluded} onChange={(v) => onChange({ decorationIncluded: v })} />
                <YesNoToggle label="Accessibility Required?" value={data.accessibilityRequired} onChange={(v) => onChange({ accessibilityRequired: v })} />
            </div>
        </div>
    )
}
