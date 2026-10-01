import { Navigate, useParams } from 'react-router-dom';
import DetailSection from '../components/DetailSection';
import EntryList from '../components/EntryList';
import Page from '../components/Page';
import ProjectHero from '../components/ProjectHero';
import { findProject, parentPath, projectCrumbs } from '../data/projects';

const CONTENT_ID = 'project-content';

export default function Project() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <Navigate to="/" replace />;

  return (
    <Page title={project.name} parent={parentPath(project)} crumbs={projectCrumbs(project)}>
      <ProjectHero title={project.name} targetId={CONTENT_ID} />

      {project.layout === 'stages' && (
        <EntryList entries={project.stages} projectName={project.name} targetId={CONTENT_ID} />
      )}
      {project.layout === 'collection' && (
        <EntryList entries={project.items} projectName={project.name} targetId={CONTENT_ID} wide />
      )}
      {project.layout === 'detail' && (
        <DetailSection id={CONTENT_ID} text={project.text} link={project.link} />
      )}
    </Page>
  );
}
