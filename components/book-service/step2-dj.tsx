'use client'

import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface DJFormData {
    genres: string[]
    mcRequired: boolean | null
    soundEquipment: boolean | null
    specialEntertainment: string
    customPlaylist: boolean | null
    atmosphere: string
}

interface Step2DJProps {
    data: DJFormData
    onChange: (data: Partial<DJFormData>) => void
}

const GENRES = ['Afrobeats', 'Highlife', 'Amapiano', 'Hip-Hop', 'R&B', 'Reggae', 'Gospel', 'Jazz', 'Classical', 'Pop', 'Electronic', 'Traditional African']
const ATMOSPHERES = ['Chill & Relaxed', 'Energetic & Hype', 'Premium & Elegant', 'Romantic', 'Cultural & Traditional']

function YesNoToggle({
    label,
    value,
    onChange,
}: {
    label: string
    value: boolean | null
    onChange: (v: boolean) => void
}) {
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

export default function Step2DJ({ data, onChange }: Step2DJProps) {
    const toggleGenre = (genre: string) => {
        const current = data.genres || []
        const updated = current.includes(genre)
            ? current.filter((g) => g !== genre)
            : [...current, genre]
        onChange({ genres: updated })
    }

    return (
        <div className="space-y-7">
            {/* Music Genres */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                    Preferred Music Genres
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {GENRES.map((genre) => (
                        <label
                            key={genre}
                            className={cn(
                                'flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all duration-200',
                                data.genres?.includes(genre)
                                    ? 'border-primary bg-primary/5 text-foreground'
                                    : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                            )}
                        >
                            <Checkbox
                                checked={data.genres?.includes(genre) || false}
                                onCheckedChange={() => toggleGenre(genre)}
                                className="flex-shrink-0"
                            />
                            <span className="text-sm font-medium">{genre}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Yes/No fields */}
            <div className="grid sm:grid-cols-2 gap-5">
                <YesNoToggle label="MC Required?" value={data.mcRequired} onChange={(v) => onChange({ mcRequired: v })} />
                <YesNoToggle label="Sound Equipment Needed?" value={data.soundEquipment} onChange={(v) => onChange({ soundEquipment: v })} />
                <YesNoToggle label="Custom Playlist?" value={data.customPlaylist} onChange={(v) => onChange({ customPlaylist: v })} />
            </div>

            {/* Special Entertainment */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">
                    Special Entertainment (Optional)
                </Label>
                <Textarea
                    placeholder="e.g., Karaoke, trivia games, live band, interactive games..."
                    value={data.specialEntertainment}
                    onChange={(e) => onChange({ specialEntertainment: e.target.value })}
                    rows={3}
                    className="resize-none"
                />
            </div>

            {/* Atmosphere */}
            <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                    Desired Atmosphere
                </Label>
                <div className="flex flex-wrap gap-2">
                    {ATMOSPHERES.map((atm) => (
                        <button
                            key={atm}
                            type="button"
                            onClick={() => onChange({ atmosphere: atm })}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                                data.atmosphere === atm
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                            )}
                        >
                            {atm}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
