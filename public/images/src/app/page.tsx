'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F0FF]">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[#5000FF] text-2xl font-bold">
            180°
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/o-nas" className="text-gray-800 hover:text-[#5000FF]">
              O nás
            </Link>
            <Link href="/proc-zrovna-my" className="text-gray-800 hover:text-[#5000FF]">
              Proč zrovna my?
            </Link>
            <Link href="/kontakt" className="text-gray-800 hover:text-[#5000FF]">
              Kontakt
            </Link>
            <Link 
              href="/konzultace"
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              Domluvit bezplatnou konzultaci
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-4">
            Otočte s námi<br />
            Váš brand o <span className="text-red-500">180°</span>
          </h1>
          <p className="text-2xl text-gray-700 mb-12">
            Pomáháme firmám vyniknout na sociálních sítích.
          </p>
          <Link
            href="/kontakt"
            className="bg-[#5000FF] text-white px-12 py-4 rounded-full text-xl hover:bg-[#4000CC] transition-colors inline-block"
          >
            Pojďme se potkat
          </Link>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-2xl text-gray-700">
              Přidejte se k firmám, kterým pomáháme růst
            </h2>
          </div>
          <div className="flex justify-center items-center gap-16">
            <div className="grayscale hover:grayscale-0 transition-all cursor-pointer">
              <img src="/images/marketa-logo.png" alt="Markéta Hildebrandt" className="h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all cursor-pointer">
              <img src="/images/povidlon-logo.png" alt="Povidloň" className="h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all cursor-pointer">
              <img src="/images/lego-logo.png" alt="LEGO" className="h-12 object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all cursor-pointer">
              <img src="/images/alissa-logo.png" alt="Alissa Beauté" className="h-12 object-contain" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 