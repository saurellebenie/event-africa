'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m EvenIA, your personal event assistant. I can help you plan your event, find the perfect providers, and create a budget. What kind of event are you planning?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That sounds like a wonderful event! Based on your requirements, I\'d recommend considering venues that offer flexibility and multiple catering options.',
        'Great choice! For this type of event, budget-wise you should allocate approximately 40% for venue, 30% for catering, 20% for entertainment, and 10% for decorations.',
        'I can help connect you with verified providers in your area. Would you like recommendations for DJs, decorators, or venues?',
        'Consider the season, guest count, and type of celebration. I can provide detailed recommendations once you share these details.',
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setLoading(false)
    }, 1500)
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user'
                  ? 'text-primary-foreground/70'
                  : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader size={16} className="animate-spin" />
              <span className="text-sm">EvenIA is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSendMessage()
              }
            }}
            placeholder="Ask EvenIA anything about your event..."
            className="flex-1"
            disabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            size="icon"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </Card>
  )
}
