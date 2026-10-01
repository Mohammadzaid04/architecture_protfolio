/**
 * Main application routing configuration.
 * Developers edit this file to register new routes, nested layouts, or dev preview paths.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { Careers } from '@/pages/Careers';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';
import { DesignSystem } from '@/pages/DesignSystem';

/**
 * Root Router component registering application and design-system preview routes.
 */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          {/* Design system preview page for client inspection and QA */}
          <Route path="design-system" element={<DesignSystem />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
