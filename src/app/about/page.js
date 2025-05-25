"use client";

import AboutHero from "@/components/AboutHero";
import VisionMission from "@/components/VisionMission";
import HowWeHelp from "@/components/HowWeHelp";
import AboutCTA from "@/components/AboutCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <VisionMission />
        <HowWeHelp />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
