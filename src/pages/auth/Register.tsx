import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { UserPlus } from 'lucide-react';
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName, lastName, email, password,
      confirmPassword, agreedToTerms
    } = userData;

    if (!agreedToTerms) return alert("You must agree to the terms");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user.uid);
    
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role: "user"
      });
    
      console.log("User document written to Firestore.");
      alert("Registration successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
    }
  };

  
  const [lawyerData, setLawyerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    barNumber: '',
    specialization: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });

  const handleLawyerChange = (e) => {
    const { id, value, type, checked } = e.target;
    setLawyerData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleLawyerSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, barNumber, specialization, password, confirmPassword, agreedToTerms } = lawyerData;

    if (!agreedToTerms) return alert("You must agree to the terms");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Lawyer created:", user.uid);

      await setDoc(doc(db, "lawyers", user.uid), {
        firstName,
        lastName,
        email,
        phone,
        barNumber,
        role: "lawyer",
        specialization,
        photo: "",
        experience: "",
        rating: 0,
        reviews: 0,
        cases: 0,
        winRate: "",
        available: true,
      });
      

      alert("Lawyer registration successful!");
      window.location.href = "/lawyer-dashboard";
    } catch (error) {
      console.error("Error during lawyer registration:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-legal-light py-12">
        <div className="container max-w-lg px-4">
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-legal-primary text-white mb-4">
              <UserPlus className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-legal-primary">Create Account</h1>
            <p className="text-gray-600 mt-2">Join us to access legal templates and services</p>
          </div>

          <Card className="border-0 shadow-lg">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="lawyer">Lawyer</TabsTrigger>
              </TabsList>

              {/* User Registration */}
              <TabsContent value="user">
                <CardHeader>
                  <CardTitle>User Registration</CardTitle>
                  <CardDescription>Create an account to access legal templates and services.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUserSubmit}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="firstName" className="text-sm font-medium">First name</label>
                          <Input id="firstName" placeholder="John" value={userData.firstName} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
                          <Input id="lastName" placeholder="Doe" value={userData.lastName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="you@example.com" value={userData.email} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input id="password" type="password" placeholder="••••••••" value={userData.password} onChange={handleChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" value={userData.confirmPassword} onChange={handleChange} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="agreedToTerms" checked={userData.agreedToTerms} onCheckedChange={(checked) => handleChange({ target: { id: "agreedToTerms", type: "checkbox", checked } })} />
                        <label htmlFor="terms" className="text-sm text-gray-600 leading-none">
                          I agree to the{" "}
                          <Link to="/terms" className="text-legal-primary hover:underline">terms of service</Link> and{" "}
                          <Link to="/privacy" className="text-legal-primary hover:underline">privacy policy</Link>
                        </label>
                      </div>
                      <Button type="submit" className="bg-legal-primary hover:bg-legal-secondary">Register</Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-legal-primary hover:underline">Sign in</Link>
                  </p>
                </CardFooter>
              </TabsContent>

              {/* Lawyer Registration */}
              <TabsContent value="lawyer">
                <CardHeader>
                  <CardTitle>Lawyer Registration</CardTitle>
                  <CardDescription>Create a professional account to offer your legal services.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLawyerSubmit}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="firstName" className="text-sm font-medium">First name</label>
                          <Input id="firstName" placeholder="John" value={lawyerData.firstName} onChange={handleLawyerChange} />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
                          <Input id="lastName" placeholder="Doe" value={lawyerData.lastName} onChange={handleLawyerChange} />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="you@example.com" value={lawyerData.email} onChange={handleLawyerChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={lawyerData.phone} onChange={handleLawyerChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="barNumber" className="text-sm font-medium">Bar Registration Number</label>
                        <Input id="barNumber" placeholder="e.g., BAR12345" value={lawyerData.barNumber} onChange={handleLawyerChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="specialization" className="text-sm font-medium">Primary Specialization</label>
                        <Input id="specialization" placeholder="e.g., Family Law, Corporate Law" value={lawyerData.specialization} onChange={handleLawyerChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input id="password" type="password" placeholder="••••••••" value={lawyerData.password} onChange={handleLawyerChange} />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" value={lawyerData.confirmPassword} onChange={handleLawyerChange} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="agreedToTerms" checked={lawyerData.agreedToTerms} onCheckedChange={(checked) => handleLawyerChange({ target: { id: "agreedToTerms", type: "checkbox", checked } })} />
                        <label htmlFor="lawyer-terms" className="text-sm text-gray-600 leading-none">
                          I agree to the{" "}
                          <Link to="/terms" className="text-legal-primary hover:underline">terms of service</Link>,{" "}
                          <Link to="/privacy" className="text-legal-primary hover:underline">privacy policy</Link>, and{" "}
                          <Link to="/lawyer-terms" className="text-legal-primary hover:underline">lawyer guidelines</Link>
                        </label>
                      </div>
                      <Button type="submit" className="bg-legal-primary hover:bg-legal-secondary">Register</Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-legal-primary hover:underline">Sign in</Link>
                  </p>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
