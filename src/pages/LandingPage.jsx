import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import DemoStats from '../components/landing/DemoStats';
import FeatureShowcase from '../components/landing/FeatureShowcase';
import HowItWorks from '../components/landing/HowItWorks';
import RolesSection from '../components/landing/RolesSection';
import DashboardPreview from '../components/landing/DashboardPreview';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <DemoStats />
        <FeatureShowcase />
        <HowItWorks />
        <RolesSection />
        <DashboardPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}