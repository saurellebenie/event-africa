import { NextRequest, NextResponse } from 'next/server'

// Mock AI chat API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory } = body

    // Mock AI responses based on keywords
    const lowerMessage = message.toLowerCase()

    let response = ''

    if (lowerMessage.includes('budget')) {
      response = 'For a typical event, I recommend allocating 40% for venue, 30% for catering, 20% for entertainment, and 10% for decorations. What is your total budget?'
    } else if (lowerMessage.includes('venue')) {
      response = 'Great! Based on your requirements, I can recommend several stunning venues. How many guests are you planning to invite?'
    } else if (lowerMessage.includes('catering') || lowerMessage.includes('food')) {
      response = 'For catering, consider the type of cuisine your guests prefer. African cuisine is very popular! What is your budget for catering?'
    } else if (lowerMessage.includes('music') || lowerMessage.includes('dj')) {
      response = 'A good DJ can make or break your event! I recommend hiring a professional with at least 5 years experience. Would you like recommendations?'
    } else if (lowerMessage.includes('decoration')) {
      response = 'Decorations set the mood for your event. I recommend allocating 10% of your budget for stunning decorations that match your theme.'
    } else {
      response = 'That\'s a great question! Could you provide more details about your event type, guest count, and budget so I can give you personalized recommendations?'
    }

    return NextResponse.json(
      { success: true, message: response },
      { status: 200 }
    )
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process message' },
      { status: 500 }
    )
  }
}
