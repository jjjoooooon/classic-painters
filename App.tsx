import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Home } from './pages/Home';
import { GalleryPage } from './pages/GalleryPage';
import { About } from './pages/About';
import { ContentProvider, useContent } from './context/ContentContext';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';

const MainLayout = () => {
  const { loading, settings } = useContent();

  // Update Favicon
  if (settings?.favicon) {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = settings.favicon;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = settings.favicon;
      document.head.appendChild(newLink);
    }
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-700">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
      <StickyMobileCTA />
      <ScrollToTop />
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <Router>
        <MainLayout />
      </Router>
    </ContentProvider>
  );
}


export default App;