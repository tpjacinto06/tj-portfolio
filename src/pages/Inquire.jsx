import Page from '../components/Page';

// Not linked from anywhere yet; reachable at /inquire.
export default function Inquire() {
  return (
    <Page title="Inquire" parent="/" crumbs={[{ label: 'Inquire' }]}>
      <main className="px-8 pb-24 pt-32 md:px-16">
        <div className="mx-auto mb-12 max-w-2xl">
          <h1 className="mb-12 text-3xl tracking-soft">Inquire</h1>
          <dl className="space-y-6 text-vandyke/90">
            <div>
              <dt className="label mb-2 text-vandyke/80">EMAIL</dt>
              <dd>
                <a href="mailto:tomasjacinto06@gmail.com" className="link-fade text-lg">
                  tomasjacinto06@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="label mb-2 text-vandyke/80">PHONE</dt>
              <dd>
                <a href="tel:+351915807500" className="link-fade text-lg">
                  +351 915 807 500
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </Page>
  );
}
