import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { HowItWorks, Footer } from "../components/HowItWorks";

export default function Landing() {
  return (
    <div className="min-h-screen bg-void text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}