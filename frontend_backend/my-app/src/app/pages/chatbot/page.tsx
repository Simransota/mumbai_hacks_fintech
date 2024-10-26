'use client'

import { useState } from 'react'
import { Send, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { ScrollArea } from "../../../components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "../../../components/ui/sidebar"

type Message = {
  content: string
  sender: 'user' | 'bot'
}

type Chat = {
  id: number
  title: string
  messages: Message[]
}

export default function FinancialAdvisorChatbot() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: 'Credit Score Inquiry',
      messages: [
        { content: "Hello! I'm your virtual financial advisor. How can I help you with your creditworthiness today?", sender: 'bot' },
        { content: "What's a good credit score?", sender: 'user' },
        { content: "A good credit score typically ranges from 670 to 739 on the FICO scale. Scores of 740 or higher are considered very good to exceptional. Remember, a higher score generally means better creditworthiness and can lead to more favorable loan terms and interest rates.", sender: 'bot' },
      ]
    }
  ])
  const [currentChatId, setCurrentChatId] = useState(1)
  const [input, setInput] = useState('')

  const currentChat = chats.find(chat => chat.id === currentChatId) || chats[0]

  const handleSend = () => {
    if (input.trim()) {
      const updatedChats = chats.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, { content: input, sender: 'user' as const }] }
          : chat
      )
      setChats(updatedChats)
      respondToUser(input)
      setInput('')
    }
  }

  const respondToUser = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase()
    let response = "I'm sorry, I didn't understand that. Could you please rephrase your question about creditworthiness?"

    if (lowerCaseMessage.includes('credit score')) {
      response = "Your credit score is a number that represents your creditworthiness. It's based on your credit history and can range from 300 to 850. The higher the score, the better. To improve your credit score, make sure to pay your bills on time, keep your credit utilization low, and don't apply for new credit too often."
    } else if (lowerCaseMessage.includes('improve') || lowerCaseMessage.includes('boost')) {
      response = "To improve your creditworthiness, consider these steps: 1) Pay all bills on time, 2) Keep credit card balances low, 3) Don't close old credit accounts, 4) Limit new credit applications, 5) Regularly check your credit report for errors."
    } else if (lowerCaseMessage.includes('report')) {
      response = "You're entitled to a free credit report from each of the three major credit bureaus once a year. You can get these reports at AnnualCreditReport.com. Regularly checking your credit report helps you spot and correct any errors that might affect your creditworthiness."
    } else if (lowerCaseMessage.includes('debt')) {
      response = "Managing debt is crucial for good creditworthiness. Try to keep your credit utilization below 30% of your available credit. If you're struggling with debt, consider creating a budget, prioritizing high-interest debt, or speaking with a credit counselor."
    }

    setTimeout(() => {
      const updatedChats = chats.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, { content: response, sender: 'bot' as const }] }
          : chat
      )
      setChats(updatedChats)
    }, 1000)
  }

  const startNewChat = () => {
    const newChatId = Math.max(...chats.map(chat => chat.id)) + 1
    const newChat: Chat = {
      id: newChatId,
      title: `New Chat ${newChatId}`,
      messages: [{ content: "Hello! I'm your virtual financial advisor. How can I help you with your creditworthiness today?", sender: 'bot' }]
    }
    setChats([...chats, newChat])
    setCurrentChatId(newChatId)
  }

  return (
    <SidebarProvider>
      <div className="flex h-[600px] max-w-7xl mx-auto border rounded-lg overflow-hidden">
        <Sidebar className="w-64 border-r">
          <SidebarHeader>
            <Button onClick={startNewChat} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> New Chat
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {chats.map(chat => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    onClick={() => setCurrentChatId(chat.id)}
                    isActive={chat.id === currentChatId}
                  >
                    {chat.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Virtual Financial Advisor</CardTitle>
            <CardDescription>Get 24/7 assistance on improving your creditworthiness</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              {currentChat.messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`flex items-end ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{message.sender === 'user' ? 'U' : 'A'}</AvatarFallback>
                      <AvatarImage src={message.sender === 'user' ? '/user-avatar.png' : '/advisor-avatar.png'} />
                    </Avatar>
                    <div className={`mx-2 py-2 px-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
              <Input 
                id="message" 
                placeholder="Type your question..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </SidebarProvider>
  )
}