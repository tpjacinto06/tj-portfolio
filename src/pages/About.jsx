import { m } from 'framer-motion';
import { ExternalLink } from '../components/DetailSection';
import Page from '../components/Page';
import { reveal } from '../lib/motion';

const CV_URL =
  'https://drive.google.com/file/d/1H9amYZtm4aLcRjg4Mk4iN_QWeMBm-KJQ/view?usp=drive_link';

// The facts, as ruled rows like a datasheet. A row's value can be any JSX.
const ROWS = [
  {
    label: 'STUDY',
    value: 'Mechanical Engineering, Loughborough University · Year 2 · Predicted First',
  },
  { label: 'EXPERIENCE', value: '—' },
  { label: 'BEYOND', value: '—' },
  {
    label: 'CONTACT',
    value: (
      <span className="flex flex-col gap-1 sm:flex-row sm:gap-6">
        <a href="mailto:tomasjacinto06@gmail.com" className="link-fade">
          tomasjacinto06@gmail.com
        </a>
        <a href="tel:+351915807500" className="link-fade">
          +351 915 807 500
        </a>
      </span>
    ),
  },
  {
    label: 'DOCUMENTS',
    value: (
      <ExternalLink href={CV_URL} className="border-b border-vandyke tracking-luxe">
        CURRICULUM VITAE ↗
      </ExternalLink>
    ),
  },
];

export default function About() {
  return (
    <Page title="About" parent="/" crumbs={[{ label: 'About' }]}>
      <main className="px-8 pb-24 pt-32 md:px-16 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <m.h1 {...reveal(0.1)} className="text-3xl uppercase tracking-soft md:text-5xl">
            Tomás Jacinto
          </m.h1>
          <m.p
            {...reveal(0.2)}
            className="mt-6 max-w-[40ch] text-lg leading-snug md:mt-8 md:text-2xl"
          >
            Mechanical engineering student at Loughborough. I design physical products, and build
            the digital side around them.
          </m.p>

          <dl className="mt-16 border-t border-vandyke md:mt-24">
            {ROWS.map((row, i) => (
              <m.div
                key={row.label}
                {...reveal(0.3 + i * 0.08)}
                className="grid grid-cols-1 gap-2 border-b border-vandyke py-5 md:grid-cols-[12rem_1fr] md:gap-6"
              >
                <dt className="label pt-1 text-vandyke/80">{row.label}</dt>
                <dd className="text-sm leading-relaxed md:text-base">{row.value}</dd>
              </m.div>
            ))}
          </dl>

          <m.p
            {...reveal(0.3 + ROWS.length * 0.08)}
            className="label mt-12 leading-loose text-vandyke/80"
          >
            COLOPHON — DESIGNED AND BUILT WITH ZERO PRIOR CODING KNOWLEDGE, USING CLAUDE CODE. SET
            IN BARLOW.
          </m.p>
        </div>
      </main>
    </Page>
  );
}
