"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase"
import {
  Calendar,
  MessageSquare,
  Briefcase,
  Award,
  Star,
  CheckCircle,
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
  Settings,
  BookOpen,
  Users,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Message {
  id: string
  sender: "lawyer" | "user"
  text: string
  timestamp: any
}

export default function LawyerDashboard() {
  const [lawyerData, setLawyerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pendingAppts, setPendingAppts] = useState([])
  const [pendingLoading, setPendingLoading] = useState(true)
  const [confirmedAppts, setConfirmedAppts] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(true)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [replyText, setReplyText] = useState("")
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "lawyers", user.uid)
        const snap = await getDoc(docRef)
        if (snap.exists()) setLawyerData(snap.data())
        setLoading(false)
        await fetchPending(user.uid)
        await fetchConfirmed(user.uid)
      }
    })
    return () => unsub()
  }, [])

  const fetchPending = async (lawyerId: string) => {
    setPendingLoading(true)
    const q = query(collection(db, "appointments"), where("lawyerId", "==", lawyerId), where("status", "==", "pending"))
    const snap = await getDocs(q)
    setPendingAppts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setPendingLoading(false)
  }

  const fetchConfirmed = async (lawyerId: string) => {
    setConfirmLoading(true)
    const q = query(
      collection(db, "appointments"),
      where("lawyerId", "==", lawyerId),
      where("status", "==", "confirmed"),
    )
    const snap = await getDocs(q)
    setConfirmedAppts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setConfirmLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLawyerData((prev: any) => ({
      ...prev,
      [name]: name === "available" ? value === "true" : value,
    }))
  }

  const handleSave = async () => {
    if (!auth.currentUser) return
    const docRef = doc(db, "lawyers", auth.currentUser.uid)
    await updateDoc(docRef, lawyerData)
    alert("Profile updated!")
    setShowProfileForm(false)
  }

  const confirmAppointment = async (apptId: string) => {
    const apptRef = doc(db, "appointments", apptId)
    await updateDoc(apptRef, { status: "confirmed" })
    if (auth.currentUser) {
      await fetchPending(auth.currentUser.uid)
      await fetchConfirmed(auth.currentUser.uid)
    }
  }

  useEffect(() => {
    if (!activeChatId) return
    const msgsRef = collection(db, "appointments", activeChatId, "messages")
    const unsub = onSnapshot(query(msgsRef, orderBy("timestamp")), (snap) => {
      setMessages((prev) => ({
        ...prev,
        [activeChatId]: snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })),
      }))
    })
    return () => unsub()
  }, [activeChatId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeChatId])

  const sendReply = async () => {
    if (!activeChatId || !replyText.trim()) return
    await addDoc(collection(db, "appointments", activeChatId, "messages"), {
      sender: "lawyer",
      text: replyText.trim(),
      timestamp: new Date(),
    })
    setReplyText("")
  }

  const toggleAppointmentDetails = (id: string) => {
    setExpandedAppointment((prev) => (prev === id ? null : id))
  }

  if (loading || !lawyerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Lawyer Dashboard</h1>
            <Badge
              variant="outline"
              className={`hidden sm:inline-flex ${
                lawyerData.available
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {lawyerData.available ? "Available" : "Unavailable"}
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/legal-library" className="text-blue-600 hover:text-blue-800 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Legal Library
            </a>

            <Dialog open={showProfileForm} onOpenChange={setShowProfileForm}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your professional information and availability status.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="experience" className="text-sm font-medium">
                        Experience (years)
                      </label>
                      <Input
                        id="experience"
                        name="experience"
                        placeholder="Experience"
                        value={lawyerData.experience || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="reviews" className="text-sm font-medium">
                        Reviews
                      </label>
                      <Input
                        id="reviews"
                        name="reviews"
                        type="number"
                        placeholder="Reviews"
                        value={lawyerData.reviews || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="cases" className="text-sm font-medium">
                        Cases
                      </label>
                      <Input
                        id="cases"
                        name="cases"
                        type="number"
                        placeholder="Cases"
                        value={lawyerData.cases || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="winRate" className="text-sm font-medium">
                        Win Rate (%)
                      </label>
                      <Input
                        id="winRate"
                        name="winRate"
                        placeholder="Win Rate"
                        value={lawyerData.winRate || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="available" className="text-sm font-medium">
                        Availability
                      </label>
                      <Select
                        name="available"
                        value={lawyerData.available ? "true" : "false"}
                        onValueChange={(value) => {
                          handleChange({
                            target: { name: "available", value },
                          } as React.ChangeEvent<HTMLSelectElement>)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Available</SelectItem>
                          <SelectItem value="false">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    <div className="flex items-center mt-2">
                      <Badge
                        variant="outline"
                        className={`${
                          lawyerData.available
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {lawyerData.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <a
                    href="/legal-library"
                    className="flex items-center p-2 rounded-md hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Legal Library
                  </a>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setShowProfileForm(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Your Total Cases</p>
                  <h3 className="text-lg sm:text-2xl font-bold">{lawyerData.cases || 0}</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Briefcase className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Your Win Rate</p>
                  <h3 className="text-lg sm:text-2xl font-bold">{lawyerData.winRate || 0}%</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <Award className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Rating</p>
                  <h3 className="text-lg sm:text-2xl font-bold">{lawyerData.rating || 0}</h3>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Reviews</p>
                  <h3 className="text-lg sm:text-2xl font-bold">{lawyerData.reviews || 0}</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="appointments" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            {/* Pending Appointments */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg sm:text-xl flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                      Pending Appointments
                    </CardTitle>
                    <CardDescription>Appointments awaiting your confirmation</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-800 border-yellow-200 mt-2 sm:mt-0 self-start sm:self-auto"
                  >
                    {pendingAppts.length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {pendingLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : pendingAppts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No pending appointments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingAppts.map((appt) => (
                      <Card key={appt.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10 border">
                                <div className="bg-gray-200 h-full w-full flex items-center justify-center text-lg font-medium text-gray-700">
                                  {appt.userName?.charAt(0) || "U"}
                                </div>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appt.userName}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>{appt.date}</span>
                                  <span className="mx-1">•</span>
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  <span>{appt.time}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => confirmAppointment(appt.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 mt-3 sm:mt-0"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-2 text-gray-500"
                            onClick={() => toggleAppointmentDetails(appt.id)}
                          >
                            {expandedAppointment === appt.id ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" /> Hide Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" /> View Details
                              </>
                            )}
                          </Button>

                          {expandedAppointment === appt.id && (
                            <div className="mt-3 pt-3 border-t text-sm">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <span className="text-gray-500">Type:</span> {appt.type || "Consultation"}
                                </div>
                                <div>
                                  <span className="text-gray-500">Duration:</span> {appt.duration || "60 minutes"}
                                </div>
                                <div>
                                  <span className="text-gray-500">Location:</span> {appt.location || "Virtual"}
                                </div>
                                <div>
                                  <span className="text-gray-500">Reference:</span> #{appt.id.slice(0, 6)}
                                </div>
                              </div>
                              {appt.notes && (
                                <div className="mt-2">
                                  <span className="text-gray-500">Notes:</span> {appt.notes}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Confirmed Appointments */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg sm:text-xl flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Confirmed Appointments
                    </CardTitle>
                    <CardDescription>Your upcoming confirmed appointments</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-800 border-green-200 mt-2 sm:mt-0 self-start sm:self-auto"
                  >
                    {confirmedAppts.length} Confirmed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {confirmLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : confirmedAppts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No confirmed appointments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {confirmedAppts.map((appt) => (
                      <Card key={appt.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10 border">
                                <div className="bg-gray-200 h-full w-full flex items-center justify-center text-lg font-medium text-gray-700">
                                  {appt.userName?.charAt(0) || "U"}
                                </div>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appt.userName}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>{appt.date}</span>
                                  <span className="mx-1">•</span>
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  <span>{appt.time}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => setActiveChatId((prev) => (prev === appt.id ? null : appt.id))}
                              variant="outline"
                              size="sm"
                              className="flex items-center mt-3 sm:mt-0"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {activeChatId === appt.id ? "Hide Chat" : "Open Chat"}
                            </Button>
                          </div>

                          {activeChatId === appt.id && (
                            <div className="mt-4 pt-4 border-t">
                              <ScrollArea className="h-48 p-3 bg-gray-50 rounded-md border">
                                {(messages[appt.id] || []).length === 0 ? (
                                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                    No messages yet. Start the conversation!
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    {(messages[appt.id] || []).map((msg) => (
                                      <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === "lawyer" ? "justify-end" : "justify-start"}`}
                                      >
                                        <div
                                          className={`max-w-[80%] p-3 rounded-lg ${
                                            msg.sender === "lawyer"
                                              ? "bg-blue-500 text-white rounded-tr-none"
                                              : "bg-gray-200 text-gray-800 rounded-tl-none"
                                          }`}
                                        >
                                          {msg.text}
                                          <div
                                            className={`text-xs mt-1 ${
                                              msg.sender === "lawyer" ? "text-blue-100" : "text-gray-500"
                                            }`}
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
                                    <div ref={chatEndRef} />
                                  </div>
                                )}
                              </ScrollArea>

                              <div className="flex gap-2 mt-3">
                                <Input
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type your reply..."
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                      e.preventDefault()
                                      sendReply()
                                    }
                                  }}
                                />
                                <Button onClick={sendReply} size="icon" disabled={!replyText.trim()}>
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Client Messages
                </CardTitle>
                <CardDescription>Manage all your client communications in one place</CardDescription>
              </CardHeader>
              <CardContent>
                {confirmedAppts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No active conversations</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {confirmedAppts.map((appt) => (
                      <Card key={appt.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10 border">
                                <div className="bg-gray-200 h-full w-full flex items-center justify-center text-lg font-medium text-gray-700">
                                  {appt.userName?.charAt(0) || "U"}
                                </div>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appt.userName}</h3>
                                <div className="text-sm text-gray-500">
                                  Appointment: {appt.date} at {appt.time}
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => setActiveChatId((prev) => (prev === appt.id ? null : appt.id))}
                              variant="ghost"
                              size="sm"
                              className="mt-3 sm:mt-0"
                            >
                              {activeChatId === appt.id ? "Hide" : "View"}
                            </Button>
                          </div>
                        </CardHeader>

                        {activeChatId === appt.id && (
                          <CardContent className="p-4 pt-2">
                            <ScrollArea className="h-48 p-3 bg-gray-50 rounded-md border">
                              {(messages[appt.id] || []).length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                  No messages yet. Start the conversation!
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {(messages[appt.id] || []).map((msg) => (
                                    <div
                                      key={msg.id}
                                      className={`flex ${msg.sender === "lawyer" ? "justify-end" : "justify-start"}`}
                                    >
                                      <div
                                        className={`max-w-[80%] p-3 rounded-lg ${
                                          msg.sender === "lawyer"
                                            ? "bg-blue-500 text-white rounded-tr-none"
                                            : "bg-gray-200 text-gray-800 rounded-tl-none"
                                        }`}
                                      >
                                        {msg.text}
                                        <div
                                          className={`text-xs mt-1 ${
                                            msg.sender === "lawyer" ? "text-blue-100" : "text-gray-500"
                                          }`}
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
                                  <div ref={chatEndRef} />
                                </div>
                              )}
                            </ScrollArea>

                            <div className="flex gap-2 mt-3">
                              <Input
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your reply..."
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    sendReply()
                                  }
                                }}
                              />
                              <Button onClick={sendReply} size="icon" disabled={!replyText.trim()}>
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}