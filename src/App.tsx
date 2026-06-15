import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Templates from "./pages/Templates";
import Lawyers from "./pages/Lawyers";
import NotFound from "./pages/NotFound";
import LawyerDashboard from "./pages/LawyerDashboard";
import Rights from "./pages/know-your-rights/know-your-rights";
import LegalLibrary from "./pages/legal-library/legal-library";
// import LegalAssistant from "./pages/legal-assistant/legal-assistant";
import Constitution from "./pages/legal-library/Constitution";
import ChiefJustices from "./pages/legal-library/ChiefJustices";
import Family from "./pages/legal-library/Family";
import Civil from "./pages/legal-library/Civil";
import Criminal from "./pages/legal-library/Criminal";
import Judgements from "./pages/legal-library/Judgements";
import Booking from "./pages/Booking";
import Assistant from "./pages/Assistant";

// Adding console logs to help debug the Shield component issue
console.log("App.tsx loaded");

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/*----------AUTH------------ */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ----------FEATURES---------*/}
          <Route path="/templates" element={<Templates />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/lawyer-dashboard" element={<LawyerDashboard/>}/>
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/know-your-rights" element={<Rights />} />
          <Route path="/legal-library" element={<LegalLibrary />} />
          <Route path="/legal-assistant" element= {<Assistant/>}/>
          <Route path="/my-appointments" element={<Booking />} />
          <Route path="/appointments" element={<Booking />} />
           {/*---------- LEGAL LIBRARY----------*/}
         <Route path="/legal-library/constitution" element={<Constitution />} />
          <Route path="/legal-library/criminal" element={<Criminal />} />
          <Route path="/legal-library/civil" element={<Civil />} />
          <Route path="/legal-library/family" element={<Family />} />
          <Route path="/legal-library/cji" element={<ChiefJustices />} />
          <Route path="/legal-library/judgements" element={<Judgements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;