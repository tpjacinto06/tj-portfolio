import IndexList from '../components/IndexList';
import Page from '../components/Page';
import { ORIGINS } from '../data/projects';

const LINKS = ORIGINS.map(origin => ({ to: `/physical/${origin.id}`, label: origin.name }));

// Physical work splits once more by how it came about, laid out as the same
// numbered index as the homepage.
export default function OriginChooser() {
  return (
    <Page title="Physical" parent="/" crumbs={[{ label: 'Physical' }]}>
      <h1 className="sr-only">Physical work</h1>
      <div className="relative h-dvh">
        <IndexList label="Physical work" items={LINKS} />
      </div>
    </Page>
  );
}
