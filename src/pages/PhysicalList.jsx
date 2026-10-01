import { Navigate, useParams } from 'react-router-dom';
import LineGallery from '../components/LineGallery';
import Page from '../components/Page';
import ProjectGrid, { CategoryHeader } from '../components/ProjectGrid';
import ProjectIndex from '../components/ProjectIndex';
import { ORIGINS, projectsIn } from '../data/projects';

// `variant` picks the layout. Only the default is linked from the site:
//   index    ruled list with hover previews (/physical/:origin)
//   lines    hairline picture gallery (/lines/physical/:origin)
//   classic  the original square-card grid (/classic/physical/:origin)
export default function PhysicalList({ variant = 'index' }) {
  const { origin: originId } = useParams();
  const origin = ORIGINS.find(o => o.id === originId);
  if (!origin) return <Navigate to="/physical" replace />;

  const projects = projectsIn('physical', origin.id);

  return (
    <Page
      title={origin.title}
      parent="/physical"
      crumbs={[{ label: 'Physical', to: '/physical' }, { label: origin.name }]}
    >
      <CategoryHeader>{origin.name}</CategoryHeader>
      {variant === 'index' && <ProjectIndex projects={projects} />}
      {variant === 'lines' && <LineGallery projects={projects} />}
      {variant === 'classic' && <ProjectGrid projects={projects} />}
    </Page>
  );
}
