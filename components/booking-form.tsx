'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Check, ChevronRight, Plus, Sparkles, Wand2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import AIEventPreview from '@/components/ai-event-preview'

interface Provider {
  id: string
  name: string
  price: number
  priceUnit: string
  category?: string
}

interface BookingFormProps {
  provider: Provider
}

const inputCls = 'w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm'
const selectCls = inputCls

/* ── toggle helper ─────────────────────────────────────── */
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const { t } = useI18n()
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex gap-2">
        {[true, false].map(v => (
          <button key={String(v)} type="button" onClick={() => onChange(v)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${value === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >{v ? t('create.yes') : t('create.no')}</button>
        ))}
      </div>
    </div>
  )
}

/* ── complementary service suggestions ─────────────────── */
const complementaryMap: Record<string, { label: string; labelFr: string }[]> = {
  'dj': [{ label: 'Photography', labelFr: 'Photographie' }, { label: 'Lighting', labelFr: 'Eclairage' }],
  'venue': [{ label: 'Decoration', labelFr: 'Decoration' }, { label: 'Catering', labelFr: 'Traiteur' }],
  'catering': [{ label: 'Venue', labelFr: 'Salle' }, { label: 'Decoration', labelFr: 'Decoration' }],
  'photography': [{ label: 'DJ & Music', labelFr: 'DJ & Musique' }, { label: 'Event Planner', labelFr: 'Organisateur' }],
  'planning': [{ label: 'Venue', labelFr: 'Salle' }, { label: 'Catering', labelFr: 'Traiteur' }, { label: 'Photography', labelFr: 'Photographie' }],
}

export default function BookingForm({ provider }: BookingFormProps) {
  const { t, locale } = useI18n()
  const [step, setStep] = useState(1)
  const TOTAL_STEPS = 3
  const [submitted, setSubmitted] = useState(false)
  const [showAIPreview, setShowAIPreview] = useState(false)

  const category = (provider.category || 'venue').toLowerCase()

  /* ── step 1: general event info ─────────────────── */
  const [general, setGeneral] = useState({
    eventType: '', eventDate: '', startTime: '', endTime: '',
    guests: '', location: '', budget: '', description: '',
  })

  /* ── step 2: category-specific ──────────────────── */
  const [djFields, setDjFields] = useState({
    genres: '', mc: false, equipment: false, entertainment: '', customPlaylist: false, atmosphere: '',
  })
  const [cateringFields, setCateringFields] = useState({
    cuisineType: '', serviceType: 'buffet', courses: '', allergies: '', drinks: false, staff: false, tableware: false,
  })
  const [venueFields, setVenueFields] = useState({
    minCapacity: '', indoorOutdoor: 'indoor', parking: false, ac: false, soundSystem: false, decoration: false, accessibility: false,
  })
  const [photoFields, setPhotoFields] = useState({
    duration: '', type: 'photo', album: false, drone: false, style: '',
  })
  const [plannerFields, setPlannerFields] = useState({
    level: 'full', theme: '', totalBudget: '', needVendors: false,
  })

  const [addedServices, setAddedServices] = useState<string[]>([])

  /* ── submit ─────────────────────────────────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  /* ── step titles ─────────────────────────────────── */
  const stepTitles = [t('booking.stepGeneral'), t('booking.stepSpecific'), t('booking.stepReview')]

  /* ── suggestions for this category ──────────────── */
  const suggestions = complementaryMap[category] || []

  /* ── summary builder ─────────────────────────────── */
  const summaryRows: { label: string; value: string }[] = []
  if (general.eventType) summaryRows.push({ label: t('booking.eventType'), value: general.eventType })
  if (general.eventDate) summaryRows.push({ label: t('booking.eventDate'), value: general.eventDate })
  if (general.startTime) summaryRows.push({ label: t('booking.startTime'), value: `${general.startTime} - ${general.endTime}` })
  if (general.guests) summaryRows.push({ label: t('booking.guests'), value: general.guests })
  if (general.location) summaryRows.push({ label: t('booking.location'), value: general.location })
  if (general.budget) summaryRows.push({ label: t('booking.budget'), value: `$${general.budget}` })

  return (
    <div className="max-w-2xl">
      <Card className="p-0 overflow-hidden">
        {/* ── header ── */}
        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">{t('booking.title')}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{t('booking.subtitle')}</p>
          {/* progress steps */}
          <div className="flex items-center gap-2 mt-4">
            {stepTitles.map((title, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                  i + 1 < step ? 'bg-primary text-primary-foreground' : i + 1 === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${i + 1 === step ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</span>
                {i < stepTitles.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {submitted && (
          <div className="mx-6 mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-600 font-medium text-sm">{t('booking.sent')}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* ═══ STEP 1: General Event Info ═══ */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.eventType')}</label>
                <select value={general.eventType} onChange={e => setGeneral(p => ({ ...p, eventType: e.target.value }))} required className={selectCls}>
                  <option value="">--</option>
                  <option value="wedding">{t('booking.wedding')}</option>
                  <option value="birthday">{t('booking.birthday')}</option>
                  <option value="conference">{t('booking.conference')}</option>
                  <option value="corporate">{t('booking.corporate')}</option>
                  <option value="private">{t('booking.privateParty')}</option>
                  <option value="other">{t('booking.other')}</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.eventDate')}</label>
                  <Input type="date" value={general.eventDate} onChange={e => setGeneral(p => ({ ...p, eventDate: e.target.value }))} required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.startTime')}</label>
                    <Input type="time" value={general.startTime} onChange={e => setGeneral(p => ({ ...p, startTime: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.endTime')}</label>
                    <Input type="time" value={general.endTime} onChange={e => setGeneral(p => ({ ...p, endTime: e.target.value }))} />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.guests')}</label>
                  <Input type="number" placeholder="150" value={general.guests} onChange={e => setGeneral(p => ({ ...p, guests: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.budget')}</label>
                  <Input type="number" value={general.budget} onChange={e => setGeneral(p => ({ ...p, budget: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.location')}</label>
                <Input value={general.location} onChange={e => setGeneral(p => ({ ...p, location: e.target.value }))} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.eventDescription')}</label>
                <textarea value={general.description} onChange={e => setGeneral(p => ({ ...p, description: e.target.value }))} rows={3} placeholder={t('booking.eventDescriptionPlaceholder')} className={inputCls} />
              </div>
            </div>
          )}

          {/* ═══ STEP 2: Category-specific ═══ */}
          {step === 2 && (
            <div className="space-y-4">
              {/* ── DJ ── */}
              {category === 'dj' && (<>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.dj.genres')}</label><Input value={djFields.genres} onChange={e => setDjFields(p => ({ ...p, genres: e.target.value }))} placeholder="Afrobeats, Amapiano, Hip-hop..." /></div>
                <Toggle label={t('booking.dj.mc')} value={djFields.mc} onChange={v => setDjFields(p => ({ ...p, mc: v }))} />
                <Toggle label={t('booking.dj.equipment')} value={djFields.equipment} onChange={v => setDjFields(p => ({ ...p, equipment: v }))} />
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.dj.entertainment')}</label><Input value={djFields.entertainment} onChange={e => setDjFields(p => ({ ...p, entertainment: e.target.value }))} placeholder="Karaoke, games..." /></div>
                <Toggle label={t('booking.dj.customPlaylist')} value={djFields.customPlaylist} onChange={v => setDjFields(p => ({ ...p, customPlaylist: v }))} />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.dj.atmosphere')}</label>
                  <select value={djFields.atmosphere} onChange={e => setDjFields(p => ({ ...p, atmosphere: e.target.value }))} className={selectCls}>
                    <option value="">--</option>
                    <option value="chill">{t('booking.dj.chill')}</option>
                    <option value="energetic">{t('booking.dj.energetic')}</option>
                    <option value="premium">{t('booking.dj.premium')}</option>
                    <option value="mixed">{t('booking.dj.mixed')}</option>
                  </select>
                </div>
              </>)}

              {/* ── Catering ── */}
              {category === 'catering' && (<>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.catering.cuisineType')}</label><Input value={cateringFields.cuisineType} onChange={e => setCateringFields(p => ({ ...p, cuisineType: e.target.value }))} placeholder="African, French, Fusion..." /></div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.catering.serviceType')}</label>
                  <select value={cateringFields.serviceType} onChange={e => setCateringFields(p => ({ ...p, serviceType: e.target.value }))} className={selectCls}>
                    <option value="buffet">{t('booking.catering.buffet')}</option>
                    <option value="plated">{t('booking.catering.plated')}</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.catering.courses')}</label><Input type="number" value={cateringFields.courses} onChange={e => setCateringFields(p => ({ ...p, courses: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.catering.allergies')}</label><Input value={cateringFields.allergies} onChange={e => setCateringFields(p => ({ ...p, allergies: e.target.value }))} placeholder="Vegan, Halal, Gluten-free..." /></div>
                <Toggle label={t('booking.catering.drinks')} value={cateringFields.drinks} onChange={v => setCateringFields(p => ({ ...p, drinks: v }))} />
                <Toggle label={t('booking.catering.staff')} value={cateringFields.staff} onChange={v => setCateringFields(p => ({ ...p, staff: v }))} />
                <Toggle label={t('booking.catering.tableware')} value={cateringFields.tableware} onChange={v => setCateringFields(p => ({ ...p, tableware: v }))} />
              </>)}

              {/* ── Venue ── */}
              {category === 'venue' && (<>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.venue.minCapacity')}</label><Input type="number" value={venueFields.minCapacity} onChange={e => setVenueFields(p => ({ ...p, minCapacity: e.target.value }))} /></div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.venue.indoorOutdoor')}</label>
                  <select value={venueFields.indoorOutdoor} onChange={e => setVenueFields(p => ({ ...p, indoorOutdoor: e.target.value }))} className={selectCls}>
                    <option value="indoor">{t('create.venue.indoor')}</option>
                    <option value="outdoor">{t('create.venue.outdoor')}</option>
                    <option value="both">{t('create.venue.both')}</option>
                  </select>
                </div>
                <Toggle label={t('booking.venue.parking')} value={venueFields.parking} onChange={v => setVenueFields(p => ({ ...p, parking: v }))} />
                <Toggle label={t('booking.venue.ac')} value={venueFields.ac} onChange={v => setVenueFields(p => ({ ...p, ac: v }))} />
                <Toggle label={t('booking.venue.soundSystem')} value={venueFields.soundSystem} onChange={v => setVenueFields(p => ({ ...p, soundSystem: v }))} />
                <Toggle label={t('booking.venue.decoration')} value={venueFields.decoration} onChange={v => setVenueFields(p => ({ ...p, decoration: v }))} />
                <Toggle label={t('booking.venue.accessibility')} value={venueFields.accessibility} onChange={v => setVenueFields(p => ({ ...p, accessibility: v }))} />
              </>)}

              {/* ── Photography ── */}
              {category === 'photography' && (<>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.photo.duration')}</label><Input value={photoFields.duration} onChange={e => setPhotoFields(p => ({ ...p, duration: e.target.value }))} placeholder="4h, 8h, Full day" /></div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.photo.type')}</label>
                  <select value={photoFields.type} onChange={e => setPhotoFields(p => ({ ...p, type: e.target.value }))} className={selectCls}>
                    <option value="photo">{t('booking.photo.photoOnly')}</option>
                    <option value="photo-video">{t('booking.photo.photoVideo')}</option>
                  </select>
                </div>
                <Toggle label={t('booking.photo.album')} value={photoFields.album} onChange={v => setPhotoFields(p => ({ ...p, album: v }))} />
                <Toggle label={t('booking.photo.drone')} value={photoFields.drone} onChange={v => setPhotoFields(p => ({ ...p, drone: v }))} />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.photo.style')}</label>
                  <select value={photoFields.style} onChange={e => setPhotoFields(p => ({ ...p, style: e.target.value }))} className={selectCls}>
                    <option value="">--</option>
                    <option value="artistic">{t('booking.photo.artistic')}</option>
                    <option value="documentary">{t('booking.photo.documentary')}</option>
                    <option value="classic">{t('booking.photo.classic')}</option>
                  </select>
                </div>
              </>)}

              {/* ── Event Planner ── */}
              {category === 'planning' && (<>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.planner.level')}</label>
                  <select value={plannerFields.level} onChange={e => setPlannerFields(p => ({ ...p, level: e.target.value }))} className={selectCls}>
                    <option value="full">{t('booking.planner.full')}</option>
                    <option value="partial">{t('booking.planner.partial')}</option>
                    <option value="day-of">{t('booking.planner.dayOf')}</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.planner.theme')}</label><Input value={plannerFields.theme} onChange={e => setPlannerFields(p => ({ ...p, theme: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium text-foreground mb-1.5">{t('booking.planner.totalBudget')}</label><Input type="number" value={plannerFields.totalBudget} onChange={e => setPlannerFields(p => ({ ...p, totalBudget: e.target.value }))} /></div>
                <Toggle label={t('booking.planner.needVendors')} value={plannerFields.needVendors} onChange={v => setPlannerFields(p => ({ ...p, needVendors: v }))} />
              </>)}

              {/* ── Complementary service suggestions ── */}
              {suggestions.length > 0 && (
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{t('booking.suggest')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map(s => {
                      const label = locale === 'fr' ? s.labelFr : s.label
                      const added = addedServices.includes(s.label)
                      return (
                        <button key={s.label} type="button"
                          onClick={() => added ? setAddedServices(prev => prev.filter(x => x !== s.label)) : setAddedServices(prev => [...prev, s.label])}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${added ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-foreground hover:bg-muted'}`}
                        >
                          {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ STEP 3: Review & Submit ═══ */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-semibold text-foreground">{t('booking.reviewTitle')}</h3>

              <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                {summaryRows.map((row, i) => (
                  <div key={i} className="flex justify-between px-4 py-3">
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-medium text-foreground">{row.value}</span>
                  </div>
                ))}
                {general.description && (
                  <div className="px-4 py-3">
                    <p className="text-sm text-muted-foreground mb-1">{t('booking.eventDescription')}</p>
                    <p className="text-sm text-foreground">{general.description}</p>
                  </div>
                )}
              </div>

              {addedServices.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{t('booking.suggest')}</p>
                  <div className="flex flex-wrap gap-2">
                    {addedServices.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">{t('booking.estimatedCost')}</p>
                <p className="text-2xl font-bold text-foreground">{provider.priceUnit}</p>
              </div>

              {/* AI Event Preview Toggle */}
              <div className="border border-primary/20 bg-primary/5 rounded-xl p-4">
                <button
                  type="button"
                  onClick={() => setShowAIPreview(!showAIPreview)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Wand2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">
                        {locale === 'fr' ? 'Visualiser avec IA' : 'Visualize with AI'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'fr' 
                          ? "Generez un apercu de votre evenement" 
                          : 'Generate a preview of your event'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    showAIPreview ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {showAIPreview && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ── navigation buttons ── */}
          <div className="flex justify-between gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => step > 1 ? setStep(step - 1) : undefined} disabled={step === 1}>
              {t('create.back')}
            </Button>
            {step < TOTAL_STEPS ? (
              <Button type="button" onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!general.eventType || !general.eventDate || !general.guests || !general.location)}>
                {t('create.next')}
              </Button>
            ) : (
              <Button type="submit">{t('booking.submit')}</Button>
            )}
          </div>

          {step === TOTAL_STEPS && (
            <p className="text-center text-xs text-muted-foreground">{t('booking.termsNotice')}</p>
          )}
        </form>
      </Card>

      {/* AI Event Preview Component */}
      {showAIPreview && step === 3 && (
        <div className="mt-8">
          <AIEventPreview />
        </div>
      )}
    </div>
  )
}
