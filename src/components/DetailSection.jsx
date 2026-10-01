// A screen of text centred under a project's title, with its outbound link.
export default function DetailSection({ id, text, link }) {
  return (
    <section id={id} className="flex min-h-dvh items-center justify-center px-8 pb-24 md:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-12 text-sm leading-relaxed text-vandyke/80">{text}</p>
        {link?.href && (
          <ExternalLink href={link.href} className="text-base tracking-luxe md:text-2xl">
            {link.label}
          </ExternalLink>
        )}
      </div>
    </section>
  );
}

export function ExternalLink({ href, className = '', children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`link-fade ${className}`}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
