import FloatingDeviceGallery from '../components/FloatingDeviceGallery';
import LineGallery from '../components/LineGallery';
import Page from '../components/Page';
import ProjectIndex from '../components/ProjectIndex';
import { CategoryHeader, ComingSoon } from '../components/ProjectGrid';
import { projectsIn } from '../data/projects';

// `variant` picks the layout. Only the default is linked from the site:
//   index    ruled list (/digital)
//   lines    hairline picture gallery (/lines/digital)
//   classic  the original floating devices (/classic/digital)
export default function Digital({ variant = 'index' }) {
  const projects = projectsIn('digital');

  return (
    <Page title="Digital" parent="/" crumbs={[{ label: 'Digital' }]}>
      <CategoryHeader>DIGITAL</CategoryHeader>
      {variant === 'index' && <ProjectIndex projects={projects} preview={false} />}
      {variant === 'lines' && <LineGallery projects={projects} layout="paired" />}
      {variant === 'classic' &&
        (projects.length > 0 ? <FloatingDeviceGallery projects={projects} /> : <ComingSoon />)}
    </Page>
  );
}
