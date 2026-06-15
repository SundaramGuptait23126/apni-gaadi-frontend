import '../index.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'ApniGaadiDekho',
  description: 'Find your right car instantly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col pb-[60px] md:pb-0">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
