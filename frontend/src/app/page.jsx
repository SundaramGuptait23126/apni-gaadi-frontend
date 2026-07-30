import HeroSection from '../components/HeroSection';
import MostSearchedCars from '../components/MostSearchedCars';
import ElectricCars from '../components/ElectricCars';

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default async function HomePage() {
  let featuredCars = [];
  try {
    const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://54.79.164.28/api/cars';
    const res = await fetch(`${carApiUrl}?featured=true`, { next: { revalidate: 60 } });
    if (res.ok) {
      featuredCars = await res.json();
    }
  } catch (error) {
    console.error('Error fetching featured cars on server:', error);
  }

  return (
    <main>
      <HeroSection initialFeaturedCars={featuredCars} />
      <MostSearchedCars />
      <ElectricCars />
    </main>
  );
}
// force vercel rebuild
