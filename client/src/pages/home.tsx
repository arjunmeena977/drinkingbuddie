import { Helmet } from 'react-helmet';
import HeroSection from '@/components/home/hero-section';
import FeaturedSection from '@/components/home/featured-section';
import ClubsSection from '@/components/home/clubs-section';
import PartnerSection from '@/components/home/partner-section';
import EventsSection from '@/components/home/events-section';
import ReviewsSection from '@/components/home/reviews-section';
import AppSection from '@/components/home/app-section';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Drinking Buddy - Your Ultimate Nightlife Companion</title>
        <meta name="description" content="Discover the best clubs, connect with drinking partners, and never miss another epic night out." />
      </Helmet>
      
      <HeroSection />
      <FeaturedSection />
      <ClubsSection />
      <PartnerSection />
      <EventsSection />
      <ReviewsSection />
      <AppSection />
    </>
  );
};

export default Home;
