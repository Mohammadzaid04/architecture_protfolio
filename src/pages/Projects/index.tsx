/**
 * Curated architectural portfolio highlights catalog page component.
 * Displays the studio's curated works with responsive 12-col header,
 * single-row category toolbar, editorial grid view,
 * and an archive consultation call-to-action block.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Clears the fixed navbar with pt-28 (112px). Eyebrow, H1, intro,
 *   and stats stack into 1 column. Toolbar filters scroll horizontally without wrapping.
 *   Projects grid displays in a balanced single column.
 * - Tablet (768px - 1023px): Two-column grid with full-width flagship card for 3+ items.
 * - Desktop (1024px+): Clears navbar with pt-32 (128px) ensuring first row of projects is visible
 *   above the 1080px fold. 12-col header with bottom-aligned stats strip. 3-column editorial grid.
 * - URL Synchronization: Synchronizes category filter (?category=Residential) with the browser URL.
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProjects } from '@/data/projects';
import { projectsPageContent } from '@/data/projectsPageContent';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';
import { ProjectsToolbar } from '@/components/projects/ProjectsToolbar';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ArchiveCTA } from '@/components/projects/ArchiveCTA';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read active category from URL (?category=Residential)
  const activeCategory = searchParams.get('category') || 'All';

  // Set accurate studio brand document title and meta description
  useDocumentHead(
    projectsPageContent.seo.title.replace(' | Sadik Agaria Architects', ''),
    projectsPageContent.seo.description,
    'Sadik Agaria Architects',
  );

  const allProjects = getAllProjects();

  // Filter projects by active category selection
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return allProjects;
    return allProjects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [allProjects, activeCategory]);

  // Handle category chip selection with URL parameter synchronization
  const handleSelectCategory = (category: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }
    // Remove any leftover view param if present from old links
    nextParams.delete('view');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="-mt-20 pt-28 md:pt-32 pb-20 sm:pb-28">
      <Section tone="light" spacing="none" className="py-0">
        <Container>
          {/* 1. Page Header (Eyebrow, H1, Editorial Intro & Stats Strip) */}
          <ProjectsHeader
            eyebrow={projectsPageContent.eyebrow}
            title={projectsPageContent.title}
            intro={projectsPageContent.intro}
            stats={projectsPageContent.stats}
          />

          {/* 2. Single Toolbar Row (Category Filters & Count Indicator) */}
          <ProjectsToolbar
            categories={projectsPageContent.categories}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            shownCount={filteredProjects.length}
            totalProjects={projectsPageContent.totalProjects}
          />

          {/* 3. Curated Presentation: Editorial Grid View */}
          <div className="pt-2 sm:pt-4">
            <ProjectsGrid
              projects={filteredProjects}
              onResetFilter={() => handleSelectCategory('All')}
              emptyMessage={projectsPageContent.emptyState.message}
              resetLabel={projectsPageContent.emptyState.resetLabel}
            />
          </div>

          {/* 4. Archive Call-to-Action Section */}
          <ArchiveCTA content={projectsPageContent.archive} />
        </Container>
      </Section>
    </div>
  );
}
