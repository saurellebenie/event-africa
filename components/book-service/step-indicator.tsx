'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
    currentStep: number
    totalSteps?: number
}

const steps = [
    { label: 'General Info', description: 'Event details' },
    { label: 'Service Details', description: 'Specific requirements' },
    { label: 'Review & Submit', description: 'Confirm your request' },
]

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100

    return (
        <div className="w-full mb-10">
            {/* Progress bar */}
            <div className="relative mb-6">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border mx-10" />
                <div
                    className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 ease-out mx-10"
                    style={{ width: `calc(${progress}% - 5rem * ${progress / 100 * 2})` }}
                />

                {/* Step circles */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1
                        const isCompleted = stepNumber < currentStep
                        const isActive = stepNumber === currentStep

                        return (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div
                                    className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 z-10 bg-background',
                                        isCompleted && 'bg-primary border-primary text-primary-foreground',
                                        isActive && 'border-primary text-primary shadow-lg shadow-primary/20 scale-110',
                                        !isCompleted && !isActive && 'border-border text-muted-foreground'
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <span>{stepNumber}</span>
                                    )}
                                </div>
                                <div className="text-center">
                                    <p
                                        className={cn(
                                            'text-xs font-semibold transition-colors',
                                            isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                        )}
                                    >
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Progress percentage */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
                    />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                    Step {currentStep} of {steps.length}
                </span>
            </div>
        </div>
    )
}
