"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { auth, db } from "../firebase";
import { Search, Star, Briefcase, Calendar, Check, MapPin, Filter, Award, Users, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import Navbar from "@/components/layout/Navbar";

const specializations = [
  "All Specializations",
  "Family Law",
  "Corporate Law",
  "Criminal Defense",
  "Intellectual Property",
  "Real Estate Law",
  "Tax Law",
  "Immigration Law",
  "Employment Law",
]

const dummyLawyers = [
  {
    id: "dummy1",
    firstName: "John",
    lastName: "Doe",
    specialization: "Corporate Law",
    photo: "",
    rating: 4.8,
    reviews: 45,
    experience: 10,
    cases: 150,
    winRate: 85,
    available: true,
    location: "New York, NY",
    hourlyRate: 250,
    education: "Harvard Law School",
    languages: ["English", "Spanish"],
    description: "Specializing in corporate law with extensive experience in mergers and acquisitions.",
  },
  {
    id: "dummy2",
    firstName: "Jane",
    lastName: "Smith",
    specialization: "Family Law",
    photo: "",
    rating: 4.5,
    reviews: 30,
    experience: 7,
    cases: 100,
    winRate: 78,
    available: false,
    location: "Los Angeles, CA",
    hourlyRate: 200,
    education: "Yale Law School",
    languages: ["English", "French"],
    description: "Dedicated family law attorney with a compassionate approach to sensitive cases.",
  },
  {
    id: "dummy3",
    firstName: "Michael",
    lastName: "Johnson",
    specialization: "Criminal Defense",
    photo: "",
    rating: 4.9,
    reviews: 60,
    experience: 15,
    cases: 200,
    winRate: 90,
    available: true,
    location: "Chicago, IL",
    hourlyRate: 300,
    education: "Stanford Law School",
    languages: ["English"],
    description: "Aggressive criminal defense attorney with a proven track record of success.",
  },
]

const handleViewProfile = () => {
  const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  window.open(pdfUrl, "_blank")
}

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([])
  const [filteredLawyers, setFilteredLawyers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations")
  const [activeBookingLawyerId, setActiveBookingLawyerId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [experienceFilter, setExperienceFilter] = useState([0, 20])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [selectedLawyer, setSelectedLawyer] = useState(null)

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lawyers"))
        const firestoreLawyers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        const combinedLawyers = [...dummyLawyers, ...firestoreLawyers]
        setLawyers(combinedLawyers)
        setFilteredLawyers(combinedLawyers)
      } catch (error) {
        console.error("Error fetching lawyers:", error)
        setLawyers(dummyLawyers)
        setFilteredLawyers(dummyLawyers)
      }
    }
    fetchLawyers()
  }, [])

  useEffect(() => {
    const q = searchQuery.toLowerCase()
    const filtered = lawyers.filter((lawyer) => {
      const fullName = `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase()
      const matchesName = fullName.includes(q)
      const matchesSpec = lawyer.specialization?.toLowerCase().includes(q)
      const matchesSpecialization =
        selectedSpecialization === "All Specializations" || lawyer.specialization === selectedSpecialization
      const matchesExperience =
        (lawyer.experience || 0) >= experienceFilter[0] && (lawyer.experience || 0) <= experienceFilter[1]
      const matchesRating = (lawyer.rating || 0) >= ratingFilter

      return (matchesName || matchesSpec) && matchesSpecialization && matchesExperience && matchesRating
    })
    setFilteredLawyers(filtered)
  }, [searchQuery, selectedSpecialization, lawyers, experienceFilter, ratingFilter])

  const handleBookClick = (lawyerId: string) => {
    setActiveBookingLawyerId((prev) => (prev === lawyerId ? null : lawyerId))
    setSelectedDate("")
    setSelectedTime("")
  }

  const handleConfirmBooking = async (lawyer) => {
    const user = auth.currentUser
    if (!user) {
      alert("Please log in to book a lawyer.")
      return
    }
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.")
      return
    }

    try {
      const appointmentData = {
        userId: user.uid,
        lawyerId: lawyer.id,
        lawyerName: `${lawyer.firstName} ${lawyer.lastName}`,
        date: selectedDate,
        time: selectedTime,
        timestamp: new Date(),
        status: "pending",
        chatRoomId: `${user.uid}_${lawyer.id}`,
      }
      await addDoc(collection(db, "appointments"), appointmentData)
      alert("Appointment booked! wait for confirmation....")
      setActiveBookingLawyerId(null)
    } catch (error) {
      console.error("Error booking appointment:", error)
      alert("Failed to book appointment. Please try again.")
    }
  }

  const openLawyerDetails = (lawyer) => {
    setSelectedLawyer(lawyer)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-legal-primary hover:bg-legal-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Find Your Legal Expert</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Connect with experienced lawyers specialized in your specific legal matters.
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="relative w-full md:flex-1">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or specialization..."
                    className="pl-10 bg-white/90 text-gray-900 border-0"
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                </div>
                <Select value={selectedSpecialization} onValueChange={(v) => setSelectedSpecialization(v)}>
                  <SelectTrigger className="bg-white/90 text-gray-900 border-0 w-full md:w-auto">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="bg-white/90 text-gray-900 border-0 hover:bg-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="bg-white rounded-lg p-4 mt-4 text-left shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-900 font-medium mb-2">Experience (years)</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={experienceFilter}
                          min={0}
                          max={20}
                          step={1}
                          onValueChange={setExperienceFilter}
                          className="my-4"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{experienceFilter[0]} years</span>
                          <span>{experienceFilter[1]} years</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium mb-2">Minimum Rating</h3>
                      <Select value={ratingFilter.toString()} onValueChange={(v) => setRatingFilter(Number(v))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Any rating</SelectItem>
                          <SelectItem value="3">3+ stars</SelectItem>
                          <SelectItem value="4">4+ stars</SelectItem>
                          <SelectItem value="4.5">4.5+ stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Lawyers Listing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{filteredLawyers.length} Lawyers Available</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="cases">Most Cases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredLawyers.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No lawyers found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your search criteria or filters to find more lawyers.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLawyers.map((lawyer) => {
                  const fullName = `${lawyer.firstName} ${lawyer.lastName}`
                  const photoURL = lawyer.photo?.startsWith("http")
                    ? lawyer.photo
                    : "/placeholder.svg?height=150&width=150"

                  return (
                    <Card key={lawyer.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 border">
                            <div className="bg-gray-200 h-full w-full flex items-center justify-center text-xl font-medium text-gray-700">
                              {lawyer.firstName?.charAt(0) || "L"}
                            </div>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{fullName}</CardTitle>
                            <div className="flex items-center mt-1">
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">
                                {lawyer.specialization}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 pt-2">
                        <div className="grid grid-cols-2 gap-y-2 text-sm mt-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>
                              {lawyer.rating || 0} ({lawyer.reviews || 0} reviews)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{lawyer.experience || 0} years</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{lawyer.cases || 0} cases</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{lawyer.winRate || 0}% win rate</span>
                          </div>
                        </div>

                        {lawyer.location && (
                          <div className="flex items-center mt-3 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{lawyer.location}</span>
                          </div>
                        )}

                        <div className="mt-3">
                          {lawyer.available ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">Available Now</Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-600">
                              Currently Unavailable
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <Separator />

                      <CardFooter className="flex justify-between p-4">
                        <Button onClick={() => openLawyerDetails(lawyer)} variant="outline">
                          View Profile
                        </Button>
                        <Button
                          onClick={() => handleBookClick(lawyer.id)}
                          disabled={!lawyer.available}
                          className={`${!lawyer.available && "opacity-50 cursor-not-allowed"}`}
                        >
                          <Calendar className="h-4 w-4 mr-1" /> Book
                        </Button>
                      </CardFooter>

                      {activeBookingLawyerId === lawyer.id && (
                        <div className="px-4 pb-4">
                          <div className="p-4 bg-gray-50 rounded-md">
                            <h3 className="font-medium mb-3">Schedule Appointment</h3>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm text-gray-600 mb-1 block">Select Date</label>
                                <Input
                                  type="date"
                                  value={selectedDate}
                                  onChange={(e) => setSelectedDate(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-gray-600 mb-1 block">Select Time</label>
                                <Input
                                  type="time"
                                  value={selectedTime}
                                  onChange={(e) => setSelectedTime(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <Button
                                onClick={() => handleConfirmBooking(lawyer)}
                                className="w-full flex items-center justify-center"
                              >
                                <Check className="h-4 w-4 mr-1" /> Confirm Booking
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lawyer Details Dialog */}
      <Dialog open={!!selectedLawyer} onOpenChange={(open) => !open && setSelectedLawyer(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Lawyer Profile</DialogTitle>
            <DialogDescription>Detailed information about this legal professional</DialogDescription>
          </DialogHeader>

          {selectedLawyer && (
            <div className="mt-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <Avatar className="h-32 w-32 mx-auto md:mx-0 border">
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center text-4xl font-medium text-gray-700">
                      {selectedLawyer.firstName?.charAt(0) || "L"}
                    </div>
                  </Avatar>

                  <div className="mt-4 text-center md:text-left">
                    <h2 className="text-xl font-bold">
                      {selectedLawyer.firstName} {selectedLawyer.lastName}
                    </h2>
                    <p className="text-gray-600">{selectedLawyer.specialization}</p>

                    <div className="flex items-center justify-center md:justify-start mt-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="ml-1 font-medium">{selectedLawyer.rating || 0}</span>
                      <span className="ml-1 text-gray-500">({selectedLawyer.reviews || 0} reviews)</span>
                    </div>

                    {selectedLawyer.available ? (
                      <Badge className="mt-3 bg-green-100 text-green-800 border-green-200">Available Now</Badge>
                    ) : (
                      <Badge variant="outline" className="mt-3 text-gray-600">
                        Currently Unavailable
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3">
                  <Tabs defaultValue="about">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-gray-700">{selectedLawyer.description || "No description available."}</p>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                            <p className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                              {selectedLawyer.location || "Not specified"}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Hourly Rate</h3>
                            <p className="mt-1">${selectedLawyer.hourlyRate || "Not specified"}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Education</h3>
                            <p className="mt-1">{selectedLawyer.education || "Not specified"}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Languages</h3>
                            <p className="mt-1">{selectedLawyer.languages?.join(", ") || "Not specified"}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="mt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <Briefcase className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                                <h3 className="text-2xl font-bold">{selectedLawyer.experience || 0}</h3>
                                <p className="text-sm text-gray-500">Years Experience</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <Award className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                                <h3 className="text-2xl font-bold">{selectedLawyer.cases || 0}</h3>
                                <p className="text-sm text-gray-500">Cases Handled</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <ThumbsUp className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                                <h3 className="text-2xl font-bold">{selectedLawyer.winRate || 0}%</h3>
                                <p className="text-sm text-gray-500">Success Rate</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                                <h3 className="text-2xl font-bold">{selectedLawyer.reviews || 0}</h3>
                                <p className="text-sm text-gray-500">Client Reviews</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Areas of Expertise</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                {selectedLawyer.specialization}
                              </Badge>
                              {/* Additional expertise areas would be mapped here */}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <Star className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                            <h3 className="text-3xl font-bold">{selectedLawyer.rating || 0}</h3>
                            <p className="text-gray-500">{selectedLawyer.reviews || 0} reviews</p>

                            <div className="mt-6">
                              <p className="text-gray-600">Client reviews will appear here.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  onClick={() => {
                    setSelectedLawyer(null)
                    handleBookClick(selectedLawyer.id)
                  }}
                  disabled={!selectedLawyer.available}
                  className={`${!selectedLawyer.available && "opacity-50 cursor-not-allowed"}`}
                >
                  <Calendar className="h-4 w-4 mr-1" /> Book Appointment
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}