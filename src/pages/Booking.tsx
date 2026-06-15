"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore"
import { auth, db } from "../firebase";
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Calendar, Clock, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"

interface Message {
  id: string
  sender: "user" | "lawyer"
  text: string
  timestamp: any
}

export default function Booking() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [newMessage, setNewMessage] = useState("")
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null)

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser
      if (!user) return
      const q = query(collection(db, "appointments"), where("userId", "==", user.uid))
      const snap = await getDocs(q)
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setAppointments(data)
      setLoading(false)
    }
    fetchAppointments()
  }, [])

  // Listen for messages when a chat opens
  useEffect(() => {
    if (!activeChatId) return

    const messagesRef = collection(db, "appointments", activeChatId, "messages")

    const unsub = onSnapshot(query(messagesRef, orderBy("timestamp")), (snap) => {
      setMessages((prev) => ({
        ...prev,
        [activeChatId]: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message),
      }))
    })

    return () => unsub()
  }, [activeChatId])

  const sendMessage = async () => {
    if (!activeChatId || !newMessage.trim()) return
    const user = auth.currentUser
    if (!user) return

    await addDoc(collection(db, "appointments", activeChatId, "messages"), {
      sender: "user",
      text: newMessage.trim(),
      timestamp: new Date(),
    })

    setNewMessage("")
  }

  const toggleAppointmentDetails = (id: string) => {
    setExpandedAppointment((prev) => (prev === id ? null : id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">Manage and track your legal consultations</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : appointments.length === 0 ? (
          <Card className="text-center py-16 bg-white">
            <CardContent>
              <div className="flex flex-col items-center">
                <Calendar className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Appointments Found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  You don't have any appointments scheduled with a lawyer yet.
                </p>
                <Button className="mt-6" variant="outline">
                  Book a Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => (
              <Card key={appt.id} className="overflow-hidden bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border">
                        <div className="bg-gray-200 h-full w-full flex items-center justify-center text-lg font-medium text-gray-700">
                          {appt.lawyerName?.charAt(0) || "L"}
                        </div>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{appt.lawyerName}</CardTitle>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{appt.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{appt.time}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(appt.status)} px-3 py-1 rounded-full text-xs font-medium`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full flex items-center justify-center text-gray-600"
                    onClick={() => toggleAppointmentDetails(appt.id)}
                  >
                    {expandedAppointment === appt.id ? (
                      <>
                        Less Details <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        More Details <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardHeader>

                {expandedAppointment === appt.id && (
                  <CardContent className="pt-0">
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <h3 className="font-medium mb-2">Appointment Details</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Type:</span> {appt.type || "Consultation"}
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span> {appt.duration || "60 minutes"}
                        </div>
                        <div>
                          <span className="text-gray-600">Location:</span> {appt.location || "Virtual"}
                        </div>
                        <div>
                          <span className="text-gray-600">Reference:</span> #{appt.id.slice(0, 6)}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center justify-center"
                        onClick={() => setActiveChatId((prev) => (prev === appt.id ? null : appt.id))}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {activeChatId === appt.id ? "Close Chat" : "Open Chat"}
                      </Button>
                    </div>
                  </CardContent>
                )}

                {activeChatId === appt.id && (
                  <CardContent className={`${expandedAppointment === appt.id ? "pt-0" : "pt-0"}`}>
                    <Separator className="my-4" />

                    <div className="bg-gray-50 rounded-md p-3">
                      <h3 className="font-medium mb-2 flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat with {appt.lawyerName}
                      </h3>

                      <ScrollArea className="h-48 mb-3 p-2 bg-white rounded border">
                        {(messages[appt.id] || []).length === 0 ? (
                          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                            No messages yet. Start the conversation!
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {(messages[appt.id] || []).map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[80%] p-3 rounded-lg ${
                                    msg.sender === "user"
                                      ? "bg-blue-500 text-white rounded-tr-none"
                                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                                  }`}
                                >
                                  {msg.text}
                                  <div
                                    className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                                  >
                                    {msg.timestamp?.toDate
                                      ? msg.timestamp
                                          .toDate()
                                          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>

                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-grow"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              sendMessage()
                            }
                          }}
                        />
                        <Button onClick={sendMessage} size="icon" disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}