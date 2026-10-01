import FadeImage from './FadeImage';

// A project's stages or items, each a heading over an image with optional
// text. They're shown last to first: the hero arrow lands on the first entry,
// at the bottom, and the visitor reads back up to the finished result.
// `targetId` goes on that first entry. `wide` lets images span the column
// rather than sit narrower beneath their heading.
export default function EntryList({ entries, projectName, targetId, wide = false }) {
  const imageFrame = wide ? '' : 'mb-8 md:mx-auto md:max-w-2xl';
  const sizes = wide ? '(min-width: 896px) 896px, 100vw' : '(min-width: 768px) 672px, 100vw';

  return (
    <section className="px-8 py-24 md:px-16">
      <div className="mx-auto max-w-4xl">
        {entries
          .map((entry, i) => ({ ...entry, first: i === 0 }))
          .reverse()
          .map(entry => (
            <div
              key={entry.title}
              id={entry.first ? targetId : undefined}
              className={entry.first ? 'mb-24' : 'mb-32'}
            >
              <h2 className="mb-8 text-2xl tracking-luxe">{entry.title}</h2>

              <div className={`aspect-video overflow-hidden bg-vandyke/5 ${imageFrame}`}>
                <FadeImage
                  src={entry.image}
                  alt={`${projectName} — ${entry.title}`}
                  sizes={sizes}
                  className="h-full w-full object-cover"
                />
              </div>

              {entry.text && (
                <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-vandyke/80">
                  {entry.text}
                </p>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}
