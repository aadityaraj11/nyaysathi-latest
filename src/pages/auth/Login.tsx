import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Lock } from 'lucide-react';
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [lawyerData, setLawyerData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e, isLawyer = false) => {
    const { id, value } = e.target;
    if (isLawyer) {
      setLawyerData(prev => ({ ...prev, [id]: value }));
    } else {
      setUserData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e, isLawyer = false) => {
    e.preventDefault();
    const { email, password } = isLawyer ? lawyerData : userData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate(isLawyer ? "/lawyer-dashboard" : "/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Error: " + error.message);
    }
  };

  const [googleLoading, setGoogleLoading] = useState(false);

const handleGoogleLogin = async (isLawyer = false) => {
  setGoogleLoading(true);
  try {
    await signInWithPopup(auth, googleProvider);
    alert("Google login successful!");
    navigate(isLawyer ? "/lawyer-dashboard" : "/");
  } catch (error) {
    console.error("Google login error:", error);
    alert("Error: " + error.message);
  } finally {
    setGoogleLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-legal-light py-12">
        <div className="container max-w-lg px-4">
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-legal-primary text-white mb-4">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-legal-primary">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </div>

          <Card className="border-0 shadow-lg">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="lawyer">Lawyer</TabsTrigger>
              </TabsList>

              {/* User Login Tab */}
              <TabsContent value="user">
                <CardHeader>
                  <CardTitle>User Login</CardTitle>
                  <CardDescription>Access your account to manage templates and appointments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, false)}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={userData.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="text-sm font-medium">Password</label>
                          <Link to="/forgot-password" className="text-sm text-legal-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={userData.password}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <Button type="submit" className="bg-legal-primary hover:bg-legal-secondary">Login</Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-legal-primary hover:underline">Sign up</Link>
                  </p>
                  <Button
  type="button"
  onClick={() => handleGoogleLogin(false)}
  className="mt-4 bg-legal-primary hover:bg-legal-secondary"
  disabled={googleLoading}
>
  <img src="/path/to/google-logo.svg" alt="G" className="mr-2" />
  {googleLoading ? "Signing in..." : "Login with Google"}
</Button>

                </CardFooter>
              </TabsContent>

              {/* Lawyer Login Tab */}
              <TabsContent value="lawyer">
                <CardHeader>
                  <CardTitle>Lawyer Login</CardTitle>
                  <CardDescription>Access your professional dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, true)}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={lawyerData.email}
                          onChange={(e) => handleChange(e, true)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="text-sm font-medium">Password</label>
                          <Link to="/forgot-password" className="text-sm text-legal-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={lawyerData.password}
                          onChange={(e) => handleChange(e, true)}
                        />
                      </div>
                      <Button type="submit" className="bg-legal-primary hover:bg-legal-secondary">Login</Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
                  <p className="text-center text-sm text-gray-600">
                    Not registered as a lawyer?{" "}
                    <Link to="/register" className="text-legal-primary hover:underline">
                      Register here
                    </Link>
                  </p>
                  <Button
  type="button"
  onClick={() => handleGoogleLogin(false)}
  className="mt-4 bg-legal-primary hover:bg-legal-secondary"
  disabled={googleLoading}
>
  <img src="/path/to/google-logo.svg" alt="G" className="mr-2" />
  {googleLoading ? "Signing in..." : "Login with Google"}
</Button>

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

export default Login;