import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWork';
import DemoQR from '@/components/DemoQR';
import CtaSection from '@/components/CTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <DemoQR/>
      <CtaSection/>
      <Footer/>
    </div>
  );
}