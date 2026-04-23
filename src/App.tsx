import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Privacy } from '@/pages/Privacy';
import { ProgrammaticHub } from '@/pages/ProgrammaticHub';
import { ProgrammaticPage } from '@/pages/ProgrammaticPage';
import { Terms } from '@/pages/Terms';

export function AppShell() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/documents" element={<ProgrammaticHub family="documents" />} />
            <Route path="/documents/:slug" element={<ProgrammaticPage family="documents" />} />
            <Route path="/solutions" element={<ProgrammaticHub family="solutions" />} />
            <Route path="/solutions/:slug" element={<ProgrammaticPage family="solutions" />} />
            <Route path="/compare" element={<ProgrammaticHub family="compare" />} />
            <Route path="/compare/:slug" element={<ProgrammaticPage family="compare" />} />
            <Route path="/integrations" element={<ProgrammaticHub family="integrations" />} />
            <Route path="/integrations/:slug" element={<ProgrammaticPage family="integrations" />} />
            <Route path="/tools" element={<ProgrammaticHub family="tools" />} />
            <Route path="/tools/:slug" element={<ProgrammaticPage family="tools" />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default AppShell;
