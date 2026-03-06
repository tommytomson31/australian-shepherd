import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/css/styles.css';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
