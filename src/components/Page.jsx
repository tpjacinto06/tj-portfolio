import { useEffect } from 'react';
import { m } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EASE } from '../lib/motion';
import { IN_APP } from '../lib/navigation';
import { scrollToTopImmediate } from '../lib/smoothScroll';

const SITE_TITLE = 'Body of Work';

// Every route renders inside one of these. It owns what each page needs once:
// the document title, starting at the top, the bar with BACK and the trail of
// where the visitor is, and fading out when they leave (App waits for that
// before mounting the next page). `crumbs` is that trail, outermost first, as
// { label, to } — the last is the current page and needs no `to`.
export default function Page({ title, parent, crumbs = [], children }) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_TITLE}` : SITE_TITLE;
  }, [title]);

  useEffect(() => {
    scrollToTopImmediate();
  }, []);

  return (
    <m.div className="min-h-dvh" exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}>
      {parent && <PageNav parent={parent} crumbs={crumbs} />}
      {children}
    </m.div>
  );
}

function PageNav({ parent, crumbs }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const goBack = () => (state?.inApp ? navigate(-1) : navigate(parent, { replace: true }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-8 py-6 md:px-16">
        <button type="button" onClick={goBack} className="label link-fade shrink-0">
          BACK
        </button>
        {crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} />}
      </div>
    </header>
  );
}

// Phones show only the last two steps, which is all that fits beside BACK.
function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="label flex items-center justify-end uppercase">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          const hiddenOnPhone = i < crumbs.length - 2;
          return (
            <li
              key={crumb.label}
              className={`${hiddenOnPhone ? 'hidden md:flex' : 'flex'} min-w-0 items-center`}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`px-3 text-vandyke/50 ${i === crumbs.length - 2 ? 'hidden md:inline' : ''}`}
                >
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="truncate">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.to} state={IN_APP} className="link-fade shrink-0 text-vandyke/80">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
