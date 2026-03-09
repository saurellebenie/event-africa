'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight } from 'lucide-react'
import Navigation from '@/components/navigation'

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    commission: '15%',
    features: [
      'Create up to 3 service listings',
      'Basic service portfolio',
      'Customer messaging',
      'Mobile Money payments',
      'Standard support',
      'Monthly earnings report',
    ],
    notIncluded: [
      'Advanced analytics',
      'Featured listings',
      'Premium support',
      'Collaboration tools',
    ],
    highlighted: false,
    cta: 'Get Started Free',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses',
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    commission: '10%',
    features: [
      'Unlimited service listings',
      'Premium portfolio showcase',
      'Advanced customer messaging',
      'All payment methods',
      'Priority support',
      'Weekly analytics reports',
      'Featured listing (3/month)',
      'Collaboration tools',
      'Custom branding',
    ],
    notIncluded: [
      'Dedicated account manager',
      'White label solution',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large teams & agencies',
    monthlyPrice: 14999,
    yearlyPrice: 149990,
    commission: '5%',
    features: [
      'Unlimited everything',
      'Premium portfolio showcase',
      'Team management (up to 10)',
      'All payment methods',
      'Dedicated account manager',
      'Daily advanced analytics',
      'Unlimited featured listings',
      'Full collaboration suite',
      'Custom branding',
      'White label solution',
      'API access',
      'Custom integrations',
    ],
    notIncluded: [],
    highlighted: false,
    cta: 'Contact Sales',
  },
]

const collaborationFeatures = [
  {
    title: 'Team Collaboration',
    description: 'Invite team members and manage permissions',
    icon: '👥',
  },
  {
    title: 'Revenue Sharing',
    description: 'Split earnings between team members automatically',
    icon: '💰',
  },
  {
    title: 'Project Management',
    description: 'Organize bookings and tasks for team projects',
    icon: '📋',
  },
  {
    title: 'Shared Analytics',
    description: 'Track performance across your entire team',
    icon: '📊',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
 <Navigation isAuthenticated={false} />
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your event business. Scale as you grow with flexible pricing and low commissions.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map(plan => (
            <Card
              key={plan.id}
              className={`relative ${plan.highlighted ? 'md:scale-105 border-primary shadow-lg' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div>
                  {plan.monthlyPrice > 0 ? (
                    <>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-bold text-foreground">₦{(plan.monthlyPrice / 1000).toFixed(0)}K</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        or ₦{(plan.yearlyPrice / 1000).toFixed(0)}K/year (save 17%)
                      </p>
                    </>
                  ) : (
                    <div>
                      <div className="text-4xl font-bold text-foreground mb-2">Free</div>
                      <p className="text-sm text-muted-foreground">Get started risk-free</p>
                    </div>
                  )}
                </div>

                {/* Commission */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Platform Commission</p>
                  <p className="font-semibold text-foreground">{plan.commission} per booking</p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <div key={`not-${idx}`} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-primary hover:bg-primary/90'
                      : 'variant-outline'
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Collaboration Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Team & Collaboration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Available on Professional and Enterprise plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {collaborationFeatures.map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept Mobile Money (M-Pesa, Airtel Money, MTN Money), credit/debit cards, and bank transfers.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No, there are no setup fees. You only pay the monthly subscription and the platform commission per booking.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our platform.',
              },
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to grow your event business?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of successful event providers on EvenIA. Start free and scale with our flexible pricing.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
