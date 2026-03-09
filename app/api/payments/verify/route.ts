import { NextRequest, NextResponse } from 'next/server'

// Mock payment verification API
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const transactionId = searchParams.get('transactionId')

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: 'Transaction ID required' },
        { status: 400 }
      )
    }

    // In production, verify with actual payment provider
    const isValid = transactionId.startsWith('TXN-')

    return NextResponse.json(
      {
        success: true,
        transactionId,
        status: isValid ? 'completed' : 'failed',
        amount: 275000,
        currency: 'KES',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Verification failed' },
      { status: 500 }
    )
  }
}
