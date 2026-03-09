import { NextRequest, NextResponse } from 'next/server'

// Mock refund API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transactionId, reason, amount } = body

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: 'Transaction ID required' },
        { status: 400 }
      )
    }

    // Process refund
    const refundId = `REF-${Date.now()}`

    console.log('Refund processed:', {
      refundId,
      transactionId,
      amount,
      reason,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        refundId,
        message: 'Refund initiated successfully',
        estimatedCompletionTime: '2-5 business days',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Refund processing error:', error)
    return NextResponse.json(
      { success: false, message: 'Refund processing failed' },
      { status: 500 }
    )
  }
}
