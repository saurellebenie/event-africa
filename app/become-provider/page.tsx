'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Navigation from '@/components/navigation'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface Document {
  id: string
  name: string
  file: File | null
  uploaded: boolean
}

export default function BecomeProviderPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    businessRegistration: '',
    taxId: '',
    bankAccount: '',
    accountHolder: '',
  })

  const [documents, setDocuments] = useState<Document[]>([
    { id: 'business', name: 'Business Registration Certificate', file: null, uploaded: false },
    { id: 'tax', name: 'Tax ID/VAT Certificate', file: null, uploaded: false },
    { id: 'bank', name: 'Bank Account Proof', file: null, uploaded: false },
    { id: 'identity', name: 'Government Issued ID', file: null, uploaded: false },
  ])

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === docId ? { ...doc, file, uploaded: true } : doc
        )
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if all required documents are uploaded
    const allUploaded = documents.every(doc => doc.uploaded)
    if (!allUploaded) {
      alert('Please upload all required documents')
      return
    }

    // Simulate API call
    console.log('[v0] Provider request submitted:', formData, documents)
    setSubmitted(true)

    // Simulate API response delay
    setTimeout(() => {
      alert('Your provider request has been submitted successfully. You will receive an email once your documents are verified.')
    }, 500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
 <Navigation isAuthenticated={true} userType="customer" userName="User" />
  
  <div className="max-w-2xl mx-auto px-4 py-16 pt-24">
          <Card className="border-primary/50">
            <CardContent className="pt-12 pb-8 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted Successfully</h2>
              <p className="text-muted-foreground mb-6">
                We have received your provider application. Our team will review your documents and get back to you within 2-3 business days via email.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                In the meantime, you can continue browsing services on our platform.
              </p>
              <Link href="/">
                <Button>Return to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
 <Navigation isAuthenticated={true} userType="customer" userName="User" />
  
  <div className="max-w-4xl mx-auto px-4 py-12 pt-20">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Become a Service Provider</h1>
          <p className="text-muted-foreground mt-2">Join our platform and start earning from your services</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex-1 flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                stepNum <= step
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded ${
                  stepNum < step ? 'bg-primary' : 'bg-muted'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service Category</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select a category</option>
                      <option value="venue">Venue</option>
                      <option value="decoration">Decoration</option>
                      <option value="catering">Catering</option>
                      <option value="dj">DJ/Music</option>
                      <option value="photography">Photography</option>
                      <option value="planning">Event Planning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+234 xxx xxxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Business Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="City, State/Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Business Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tell us about your services, experience, and what makes you unique"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Bank Information */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Bank & Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    This information is used for payouts. All data is encrypted and secure.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Business Registration Number</label>
                    <input
                      type="text"
                      name="businessRegistration"
                      value={formData.businessRegistration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="CAC/Business registration number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tax ID / VAT Number</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bank Account Number</label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your bank account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Name on the bank account"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Required Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Please upload all required documents for verification. Accepted formats: PDF, JPG, PNG (Max 5MB each)
                </p>

                {documents.map((doc) => (
                  <div key={doc.id} className="border border-border rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.file ? doc.file.name : 'No file selected'}
                          </p>
                        </div>
                      </div>
                      {doc.uploaded ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : (
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      )}
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png,.jpeg"
                        onChange={(e) => handleFileUpload(e, doc.id)}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </Button>
            )}
            <div className="ml-auto flex gap-3">
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
