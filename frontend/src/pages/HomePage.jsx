import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import PlacementBanner from '@/components/home/PlacementBanner';
import BadgesTeaser from '@/components/home/BadgesTeaser';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategorySection />
      <PlacementBanner />
      <BadgesTeaser />
      <Footer />
    </div>
  );
}
