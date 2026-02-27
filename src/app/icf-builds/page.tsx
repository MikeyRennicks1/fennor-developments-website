import Link from "next/link";

export default function IcfBuildsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-dark py-14 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/25 via-gold/8 to-gold/18" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">ICF & Builds</h1>
          <p className="mt-3 text-lg text-gray-200">Turnkey from plot to handover.</p>
          <Link href="/" className="mt-6 inline-block text-gold hover:text-gold-light">← Home</Link>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-b from-white to-gold/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">ICF content coming soon.</p>
        </div>
      </section>
    </>
  );
}
