'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface PhotographyFormData {
    coverageDuration: string
    coverageType: string
    printedAlbum: boolean | null
    droneCoverage: boolean | null
    style: string
}

interface Step2PhotographyProps {
    data: PhotographyFormData
    onChange: (data: Partial<PhotographyFormData>) => void
}

const COVERAGE_TYPES = [
    { value: 'photo', label: '📷 Photo Only', desc: 'Professional photography' },
    { value: 'video', label: '🎬 Video Only', desc: 'Cinematic videography' },
    { value: 'both', label: '📸🎬 Photo + Video', desc: 'Full coverage package' },
]

const STYLES = ['Artistic', 'Documentary', 'Classic', 'Candid', 'Editorial', 'Cinematic']

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

export default function Step2Photography({ data, onChange }: Step2PhotographyProps) {
    return (
        <div className="space-y-7">
            {/* Coverage Duration */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Coverage Duration (hours)
                </Label>
                <Input
                    type="number"
                    placeholder="e.g., 8"
                    value={data.coverageDuration}
                    onChange={(e) => onChange({ coverageDuration: e.target.value })}
                    min="1"
                    max="24"
                    className="w-full sm:w-40"
                />
            </div>

            {/* Coverage Type */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Coverage Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {COVERAGE_TYPES.map((ct) => (
                        <button
                            key={ct.value}
                            type="button"
                            onClick={() => onChange({ coverageType: ct.value })}
                            className={cn(
                                'flex flex-col items-center gap-1 py-4 px-3 rounded-xl border-2 text-center transition-all duration-200',
                                data.coverageType === ct.value
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-border bg-card hover:border-primary/40'
                            )}
                        >
                            <span className="text-xl">{ct.label.split(' ')[0]}</span>
                            <span className={cn('text-sm font-semibold', data.coverageType === ct.value ? 'text-primary' : 'text-foreground')}>
                                {ct.label.split(' ').slice(1).join(' ')}
                            </span>
                            <span className="text-xs text-muted-foreground">{ct.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Yes/No toggles */}
            <div className="grid sm:grid-cols-2 gap-5">
                <YesNoToggle label="Printed Album Included?" value={data.printedAlbum} onChange={(v) => onChange({ printedAlbum: v })} />
                <YesNoToggle label="Drone Coverage?" value={data.droneCoverage} onChange={(v) => onChange({ droneCoverage: v })} />
            </div>

            {/* Style */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Desired Style</Label>
                <div className="flex flex-wrap gap-2">
                    {STYLES.map((style) => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => onChange({ style })}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                                data.style === style
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                            )}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
