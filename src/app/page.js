import React from 'react';
import Hero from '@/components/Hero';
import WhyGoDigital from '@/components/WhyGoDigital';
import HowItWorks from '@/components/HowItWork';
import DemoQR from '@/components/DemoQR';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';




export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <WhyGoDigital/>
      <HowItWorks/>
      <DemoQR/>
      <CTA  />
      <Footer/>
    </div>
  );
}