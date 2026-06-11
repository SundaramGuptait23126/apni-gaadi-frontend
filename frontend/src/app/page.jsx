import HeroSection from '../components/HeroSection';
import MostSearchedCars from '../components/MostSearchedCars';
import ElectricCars from '../components/ElectricCars';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featuredCars = [];
  try {
    const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://localhost:5002/api/cars';
    const res = await fetch(`${carApiUrl}?featured=true`, { cache: 'no-store' });
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
