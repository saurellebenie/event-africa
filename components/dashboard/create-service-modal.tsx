'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Upload, Trash2, Check, Save, Eye } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface CreateServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES = ['DJ & Music', 'Catering', 'Venue', 'Photography', 'Event Planning'] as const
type Category = (typeof CATEGORIES)[number]

/* ── chip input helper ─────────────────────────────────── */
function ChipInput({
  items,
  onAdd,
  onRemove,
  placeholder,
}: {
  items: string[]
  onAdd: (v: string) => void
  onRemove: (v: string) => void
  placeholder: string
}) {
  const [value, setValue] = useState('')
  const { t } = useI18n()
  const add = () => {
    const v = value.trim()
    if (v && !items.includes(v)) { onAdd(v); setValue('') }
  }
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <Button type="button" onClick={add} variant="outline" size="sm">{t('create.add')}</Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <span key={item} className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {item}
              <button type="button" onClick={() => onRemove(item)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── toggle helper ──────────────────────────────────────── */
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const { t } = useI18n()
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex gap-2">
        <button type="button" onClick={() => onChange(true)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >{t('create.yes')}</button>
        <button type="button" onClick={() => onChange(false)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${!value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >{t('create.no')}</button>
      </div>
    </div>
  )
}

/* ── field wrapper ──────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm'
const selectCls = inputCls

/* ═══════════════════════════════════════════════════════ */
export default function CreateServiceModal({ isOpen, onClose }: CreateServiceModalProps) {
  const { t } = useI18n()
  const [step, setStep] = useState(1)
  const TOTAL_STEPS = 4
  const [autoSaved, setAutoSaved] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  /* ── form state ──────────────────────────────────── */
  const [basic, setBasic] = useState({
    title: '', category: '' as Category | '', location: '', description: '', phone: '',
    travel: false, travelRadius: '', tags: [] as string[], maxCapacity: '', yearsExperience: '', eventTypes: [] as string[],
  })

  const [pricing, setPricing] = useState({
    basePrice: '', pricingModel: 'fixed',
  })

  const [dj, setDj] = useState({
    genres: [] as string[], equipment: [] as string[], mc: false,
    duration: '', setupTime: '', techRequirements: '', sampleMixes: '', customPlaylist: false,
  })

  const [catering, setCatering] = useState({
    cuisineTypes: [] as string[], menuPackages: '', pricePerGuest: '', minGuests: '',
    dietary: [] as string[], staffIncluded: false, equipmentProvided: false,
    onSite: 'on-site', tasting: false, certifications: '',
  })

  const [venue, setVenue] = useState({
    totalCapacity: '', type: 'indoor', seating: [] as string[], parking: '',
    amenities: [] as string[], decorFlexibility: '', rentalDuration: '',
    security: false, insurance: '', virtualTour: '',
  })

  const [photo, setPhoto] = useState({
    styles: [] as string[], video: false, packages: '' ,
    editing: false, deliveryTime: '', drone: false, equipmentList: '', travelFees: '',
  })

  const [planner, setPlanner] = useState({
    level: 'full', specialtyEvents: [] as string[], vendorNetwork: '',
    budgetManagement: '', teamSize: '', caseStudies: '',
  })

  const [photos, setPhotos] = useState<File[]>([])

  /* ── auto-save ──────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => { setAutoSaved(true); setTimeout(() => setAutoSaved(false), 2000) }, 5000)
    return () => clearTimeout(timer)
  }, [basic, pricing, dj, catering, venue, photo, planner, photos, isOpen])

  /* ── profile completion ─────────────────────────── */
  const getCompletion = useCallback(() => {
    let filled = 0, total = 0
    // basic fields
    const basicFields = [basic.title, basic.category, basic.location, basic.description, basic.phone]
    total += basicFields.length; filled += basicFields.filter(Boolean).length
    // pricing
    total += 1; if (pricing.basePrice) filled += 1
    // category-specific (sample count)
    if (basic.category === 'DJ & Music') { total += 3; if (dj.genres.length) filled++; if (dj.duration) filled++; if (dj.equipment.length) filled++ }
    if (basic.category === 'Catering') { total += 3; if (catering.cuisineTypes.length) filled++; if (catering.pricePerGuest) filled++; if (catering.minGuests) filled++ }
    if (basic.category === 'Venue') { total += 3; if (venue.totalCapacity) filled++; if (venue.amenities.length) filled++; if (venue.parking) filled++ }
    if (basic.category === 'Photography') { total += 3; if (photo.styles.length) filled++; if (photo.deliveryTime) filled++; if (photo.packages) filled++ }
    if (basic.category === 'Event Planning') { total += 3; if (planner.specialtyEvents.length) filled++; if (planner.teamSize) filled++; if (planner.vendorNetwork) filled++ }
    // photos
    total += 1; if (photos.length >= 3) filled += 1
    return total === 0 ? 0 : Math.round((filled / total) * 100)
  }, [basic, pricing, dj, catering, venue, photo, planner, photos])

  const completion = getCompletion()

  /* ── handlers ───────────────────────────────────── */
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(prev => [...prev, ...Array.from(e.target.files!)])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API call would go here
    onClose()
    setStep(1)
  }

  if (!isOpen) return null

  /* ── step titles ────────────────────────────────── */
  const stepTitles = [t('create.stepBasic'), t('create.stepCategory'), t('create.stepPricing'), t('create.stepPhotos')]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* ── header ── */}
        <CardHeader className="flex-shrink-0 flex flex-row items-start justify-between border-b px-6 py-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{t('create.title')}</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">{t('create.step')} {step} {t('create.of')} {TOTAL_STEPS} — {stepTitles[step - 1]}</p>
            {/* progress bar */}
            <div className="flex gap-1.5 mt-3">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            {/* completion badge */}
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"
                    strokeDasharray={`${completion} ${100 - completion}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">{completion}%</span>
              </div>
            </div>
            {autoSaved && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <Check className="w-3 h-3" />{t('create.autoSaved')}
              </span>
            )}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
        </CardHeader>

        {/* ── body ── */}
        <CardContent className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} id="create-service-form" className="space-y-5">
            {/* ═══ STEP 1: Basic Info ═══ */}
            {step === 1 && (
              <div className="space-y-4">
                <Field label={t('create.serviceTitle')}>
                  <input type="text" value={basic.title} onChange={e => setBasic(p => ({ ...p, title: e.target.value }))} placeholder={t('create.serviceTitlePlaceholder')} className={inputCls} />
                </Field>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t('create.category')}>
                    <select value={basic.category} onChange={e => setBasic(p => ({ ...p, category: e.target.value as Category }))} className={selectCls}>
                      <option value="">{t('create.selectCategory')}</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label={t('create.location')}>
                    <input type="text" value={basic.location} onChange={e => setBasic(p => ({ ...p, location: e.target.value }))} placeholder={t('create.locationPlaceholder')} className={inputCls} />
                  </Field>
                </div>

                <Field label={t('create.description')}>
                  <textarea value={basic.description} onChange={e => setBasic(p => ({ ...p, description: e.target.value }))} placeholder={t('create.descriptionPlaceholder')} rows={4} className={inputCls} />
                </Field>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t('create.phone')}>
                    <input type="tel" value={basic.phone} onChange={e => setBasic(p => ({ ...p, phone: e.target.value }))} placeholder="+234..." className={inputCls} />
                  </Field>
                  <Field label={t('create.yearsExperience')}>
                    <input type="number" value={basic.yearsExperience} onChange={e => setBasic(p => ({ ...p, yearsExperience: e.target.value }))} className={inputCls} />
                  </Field>
                </div>

                <Toggle label={t('create.travelAvailable')} value={basic.travel} onChange={v => setBasic(p => ({ ...p, travel: v }))} />
                {basic.travel && (
                  <Field label={t('create.travelRadius')}>
                    <input type="number" value={basic.travelRadius} onChange={e => setBasic(p => ({ ...p, travelRadius: e.target.value }))} placeholder="50" className={inputCls} />
                  </Field>
                )}

                <Field label={t('create.maxCapacity')}>
                  <input type="number" value={basic.maxCapacity} onChange={e => setBasic(p => ({ ...p, maxCapacity: e.target.value }))} className={inputCls} />
                </Field>

                <Field label={t('create.tags')}>
                  <ChipInput items={basic.tags} onAdd={v => setBasic(p => ({ ...p, tags: [...p.tags, v] }))} onRemove={v => setBasic(p => ({ ...p, tags: p.tags.filter(t => t !== v) }))} placeholder={t('create.tagsPlaceholder')} />
                </Field>

                <Field label={t('create.eventTypes')}>
                  <ChipInput items={basic.eventTypes} onAdd={v => setBasic(p => ({ ...p, eventTypes: [...p.eventTypes, v] }))} onRemove={v => setBasic(p => ({ ...p, eventTypes: p.eventTypes.filter(t => t !== v) }))} placeholder="Wedding, Birthday..." />
                </Field>
              </div>
            )}

            {/* ═══ STEP 2: Category-specific ═══ */}
            {step === 2 && (
              <div className="space-y-4">
                {!basic.category && <p className="text-sm text-muted-foreground py-8 text-center">{t('create.selectCategory')}</p>}

                {/* ── DJ ── */}
                {basic.category === 'DJ & Music' && (<>
                  <Field label={t('create.dj.genres')}>
                    <ChipInput items={dj.genres} onAdd={v => setDj(p => ({ ...p, genres: [...p.genres, v] }))} onRemove={v => setDj(p => ({ ...p, genres: p.genres.filter(g => g !== v) }))} placeholder="Afrobeats, Amapiano, Hip-hop..." />
                  </Field>
                  <Field label={t('create.dj.equipment')}>
                    <ChipInput items={dj.equipment} onAdd={v => setDj(p => ({ ...p, equipment: [...p.equipment, v] }))} onRemove={v => setDj(p => ({ ...p, equipment: p.equipment.filter(e => e !== v) }))} placeholder="Sound system, Lighting, Smoke machine..." />
                  </Field>
                  <Toggle label={t('create.dj.mc')} value={dj.mc} onChange={v => setDj(p => ({ ...p, mc: v }))} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label={t('create.dj.duration')}><input type="text" value={dj.duration} onChange={e => setDj(p => ({ ...p, duration: e.target.value }))} placeholder="4h, 6h, 8h" className={inputCls} /></Field>
                    <Field label={t('create.dj.setupTime')}><input type="text" value={dj.setupTime} onChange={e => setDj(p => ({ ...p, setupTime: e.target.value }))} placeholder="1h" className={inputCls} /></Field>
                  </div>
                  <Field label={t('create.dj.techRequirements')}><textarea value={dj.techRequirements} onChange={e => setDj(p => ({ ...p, techRequirements: e.target.value }))} rows={2} className={inputCls} /></Field>
                  <Field label={t('create.dj.sampleMixes')}><input type="text" value={dj.sampleMixes} onChange={e => setDj(p => ({ ...p, sampleMixes: e.target.value }))} placeholder="https://soundcloud.com/..." className={inputCls} /></Field>
                  <Toggle label={t('create.dj.customPlaylist')} value={dj.customPlaylist} onChange={v => setDj(p => ({ ...p, customPlaylist: v }))} />
                </>)}

                {/* ── Catering ── */}
                {basic.category === 'Catering' && (<>
                  <Field label={t('create.catering.cuisineTypes')}>
                    <ChipInput items={catering.cuisineTypes} onAdd={v => setCatering(p => ({ ...p, cuisineTypes: [...p.cuisineTypes, v] }))} onRemove={v => setCatering(p => ({ ...p, cuisineTypes: p.cuisineTypes.filter(c => c !== v) }))} placeholder="Africain, Francais, Fusion..." />
                  </Field>
                  <Field label={t('create.catering.menuPackages')}><textarea value={catering.menuPackages} onChange={e => setCatering(p => ({ ...p, menuPackages: e.target.value }))} rows={3} className={inputCls} placeholder="Basic: ...\nPremium: ..." /></Field>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label={t('create.catering.pricePerGuest')}><input type="number" value={catering.pricePerGuest} onChange={e => setCatering(p => ({ ...p, pricePerGuest: e.target.value }))} className={inputCls} /></Field>
                    <Field label={t('create.catering.minGuests')}><input type="number" value={catering.minGuests} onChange={e => setCatering(p => ({ ...p, minGuests: e.target.value }))} className={inputCls} /></Field>
                  </div>
                  <Field label={t('create.catering.dietary')}>
                    <ChipInput items={catering.dietary} onAdd={v => setCatering(p => ({ ...p, dietary: [...p.dietary, v] }))} onRemove={v => setCatering(p => ({ ...p, dietary: p.dietary.filter(d => d !== v) }))} placeholder="Vegan, Halal, Gluten-free..." />
                  </Field>
                  <Toggle label={t('create.catering.staffIncluded')} value={catering.staffIncluded} onChange={v => setCatering(p => ({ ...p, staffIncluded: v }))} />
                  <Toggle label={t('create.catering.equipmentProvided')} value={catering.equipmentProvided} onChange={v => setCatering(p => ({ ...p, equipmentProvided: v }))} />
                  <Field label={t('create.catering.onSite')}>
                    <select value={catering.onSite} onChange={e => setCatering(p => ({ ...p, onSite: e.target.value }))} className={selectCls}>
                      <option value="on-site">Sur place</option>
                      <option value="off-site">A emporter</option>
                      <option value="both">Les deux</option>
                    </select>
                  </Field>
                  <Toggle label={t('create.catering.tasting')} value={catering.tasting} onChange={v => setCatering(p => ({ ...p, tasting: v }))} />
                  <Field label={t('create.catering.certifications')}><input type="text" value={catering.certifications} onChange={e => setCatering(p => ({ ...p, certifications: e.target.value }))} className={inputCls} /></Field>
                </>)}

                {/* ── Venue ── */}
                {basic.category === 'Venue' && (<>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label={t('create.venue.totalCapacity')}><input type="number" value={venue.totalCapacity} onChange={e => setVenue(p => ({ ...p, totalCapacity: e.target.value }))} className={inputCls} /></Field>
                    <Field label={t('create.venue.type')}>
                      <select value={venue.type} onChange={e => setVenue(p => ({ ...p, type: e.target.value }))} className={selectCls}>
                        <option value="indoor">{t('create.venue.indoor')}</option>
                        <option value="outdoor">{t('create.venue.outdoor')}</option>
                        <option value="both">{t('create.venue.both')}</option>
                      </select>
                    </Field>
                  </div>
                  <Field label={t('create.venue.seating')}>
                    <ChipInput items={venue.seating} onAdd={v => setVenue(p => ({ ...p, seating: [...p.seating, v] }))} onRemove={v => setVenue(p => ({ ...p, seating: p.seating.filter(s => s !== v) }))} placeholder="Theatre, Banquet, Cocktail..." />
                  </Field>
                  <Field label={t('create.venue.parking')}><input type="text" value={venue.parking} onChange={e => setVenue(p => ({ ...p, parking: e.target.value }))} placeholder="50 places" className={inputCls} /></Field>
                  <Field label={t('create.venue.amenities')}>
                    <ChipInput items={venue.amenities} onAdd={v => setVenue(p => ({ ...p, amenities: [...p.amenities, v] }))} onRemove={v => setVenue(p => ({ ...p, amenities: p.amenities.filter(a => a !== v) }))} placeholder="AC, Sound system, Stage, Lighting..." />
                  </Field>
                  <Field label={t('create.venue.decorFlexibility')}><input type="text" value={venue.decorFlexibility} onChange={e => setVenue(p => ({ ...p, decorFlexibility: e.target.value }))} className={inputCls} /></Field>
                  <Field label={t('create.venue.rentalDuration')}><input type="text" value={venue.rentalDuration} onChange={e => setVenue(p => ({ ...p, rentalDuration: e.target.value }))} placeholder="4h, 8h, Full day" className={inputCls} /></Field>
                  <Toggle label={t('create.venue.security')} value={venue.security} onChange={v => setVenue(p => ({ ...p, security: v }))} />
                  <Field label={t('create.venue.insurance')}><input type="text" value={venue.insurance} onChange={e => setVenue(p => ({ ...p, insurance: e.target.value }))} className={inputCls} /></Field>
                  <Field label={t('create.venue.virtualTour')}><input type="url" value={venue.virtualTour} onChange={e => setVenue(p => ({ ...p, virtualTour: e.target.value }))} placeholder="https://..." className={inputCls} /></Field>
                </>)}

                {/* ── Photography ── */}
                {basic.category === 'Photography' && (<>
                  <Field label={t('create.photo.styles')}>
                    <ChipInput items={photo.styles} onAdd={v => setPhoto(p => ({ ...p, styles: [...p.styles, v] }))} onRemove={v => setPhoto(p => ({ ...p, styles: p.styles.filter(s => s !== v) }))} placeholder="Artistic, Documentary, Classic..." />
                  </Field>
                  <Toggle label={t('create.photo.video')} value={photo.video} onChange={v => setPhoto(p => ({ ...p, video: v }))} />
                  <Field label={t('create.photo.packages')}><textarea value={photo.packages} onChange={e => setPhoto(p => ({ ...p, packages: e.target.value }))} rows={3} className={inputCls} placeholder="Basic: ...\nStandard: ...\nPremium: ..." /></Field>
                  <Toggle label={t('create.photo.editing')} value={photo.editing} onChange={v => setPhoto(p => ({ ...p, editing: v }))} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label={t('create.photo.deliveryTime')}><input type="text" value={photo.deliveryTime} onChange={e => setPhoto(p => ({ ...p, deliveryTime: e.target.value }))} placeholder="2 weeks" className={inputCls} /></Field>
                    <Field label={t('create.photo.travelFees')}><input type="text" value={photo.travelFees} onChange={e => setPhoto(p => ({ ...p, travelFees: e.target.value }))} className={inputCls} /></Field>
                  </div>
                  <Toggle label={t('create.photo.drone')} value={photo.drone} onChange={v => setPhoto(p => ({ ...p, drone: v }))} />
                  <Field label={t('create.photo.equipmentList')}><textarea value={photo.equipmentList} onChange={e => setPhoto(p => ({ ...p, equipmentList: e.target.value }))} rows={2} className={inputCls} /></Field>
                </>)}

                {/* ── Event Planning ── */}
                {basic.category === 'Event Planning' && (<>
                  <Field label={t('create.planner.level')}>
                    <select value={planner.level} onChange={e => setPlanner(p => ({ ...p, level: e.target.value }))} className={selectCls}>
                      <option value="full">{t('create.planner.full')}</option>
                      <option value="partial">{t('create.planner.partial')}</option>
                      <option value="day-of">{t('create.planner.dayOf')}</option>
                    </select>
                  </Field>
                  <Field label={t('create.planner.specialtyEvents')}>
                    <ChipInput items={planner.specialtyEvents} onAdd={v => setPlanner(p => ({ ...p, specialtyEvents: [...p.specialtyEvents, v] }))} onRemove={v => setPlanner(p => ({ ...p, specialtyEvents: p.specialtyEvents.filter(s => s !== v) }))} placeholder="Wedding, Corporate, Gala..." />
                  </Field>
                  <Field label={t('create.planner.vendorNetwork')}><textarea value={planner.vendorNetwork} onChange={e => setPlanner(p => ({ ...p, vendorNetwork: e.target.value }))} rows={2} className={inputCls} /></Field>
                  <Field label={t('create.planner.budgetManagement')}><input type="text" value={planner.budgetManagement} onChange={e => setPlanner(p => ({ ...p, budgetManagement: e.target.value }))} className={inputCls} /></Field>
                  <Field label={t('create.planner.teamSize')}><input type="text" value={planner.teamSize} onChange={e => setPlanner(p => ({ ...p, teamSize: e.target.value }))} className={inputCls} /></Field>
                  <Field label={t('create.planner.caseStudies')}><textarea value={planner.caseStudies} onChange={e => setPlanner(p => ({ ...p, caseStudies: e.target.value }))} rows={3} className={inputCls} /></Field>
                </>)}
              </div>
            )}

            {/* ═══ STEP 3: Pricing ═══ */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label={t('create.basePrice')}>
                    <input type="number" value={pricing.basePrice} onChange={e => setPricing(p => ({ ...p, basePrice: e.target.value }))} className={inputCls} />
                  </Field>
                  <Field label={t('create.pricingModel')}>
                    <select value={pricing.pricingModel} onChange={e => setPricing(p => ({ ...p, pricingModel: e.target.value }))} className={selectCls}>
                      <option value="fixed">{t('create.pricingFixed')}</option>
                      <option value="hourly">{t('create.pricingHourly')}</option>
                      <option value="per-guest">{t('create.pricingPerGuest')}</option>
                      <option value="package">{t('create.pricingPackage')}</option>
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {/* ═══ STEP 4: Photos ═══ */}
            {step === 4 && (
              <div className="space-y-4">
                <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-foreground">{t('create.uploadPhotos')}</p>
                    <p className="text-xs text-muted-foreground">{t('create.uploadHint')}</p>
                  </div>
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {photos.map((p, i) => (
                      <div key={i} className="relative">
                        <img src={URL.createObjectURL(p)} alt={`Upload ${i}`} className="w-full h-24 object-cover rounded-lg" />
                        <button type="button" onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2 text-sm">{t('create.photoTips')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>{'- '}{t('create.tip1')}</li>
                    <li>{'- '}{t('create.tip2')}</li>
                    <li>{'- '}{t('create.tip3')}</li>
                    <li>{'- '}{t('create.tip4')}</li>
                  </ul>
                </div>
              </div>
            )}
          </form>
        </CardContent>

        {/* ── footer ── */}
        <div className="flex-shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-border">
          <Button type="button" variant="outline" onClick={() => step > 1 ? setStep(step - 1) : onClose()}>
            {step === 1 ? t('create.cancel') : t('create.back')}
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setAutoSaved(true)} className="gap-1.5 text-muted-foreground">
              <Save className="w-4 h-4" />{t('create.saveDraft')}
            </Button>
            {step < TOTAL_STEPS ? (
              <Button type="button" onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!basic.title || !basic.category)}>
                {t('create.next')}
              </Button>
            ) : (
              <Button type="submit" form="create-service-form">
                {t('create.publish')}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
