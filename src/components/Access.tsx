import Logo from '@/components/Logo'

export default function Access() {
  return (
    <article className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <h2 className="font-josefin mb-12 text-center text-5xl md:mb-16 md:text-6xl">Access</h2>
      <div className="flex flex-col items-center space-y-6 md:space-y-12">
        <img
          className="h-full w-full max-w-96 rounded-4xl object-cover object-center md:aspect-[1/1.5]"
          src="/caffe-astore/assets/others/shop.png"
          alt="Caffè Astore 店内写真"
        />

        <address className="flex flex-col items-center space-y-4 not-italic">
          <Logo className="text-foreground h-auto w-36" />
          <p className="text-sm md:text-base">
            <span className="pr-2">カフェ</span>アストーレ
          </p>
          <a
            href="https://maps.app.goo.gl/ZYWGP86SaL5MYLUKA"
            className="inline-flex items-center border-b border-neutral-400 pb-1 text-base transition-colors hover:border-neutral-800 md:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            大阪府中央区玉造2-1-3
          </a>
          <p className="text-base md:text-lg">
            <time>12:00 〜 20:00</time>
            <span className="px-4">/</span>日・月<span className="pl-4">定休</span>
          </p>
          <nav aria-label="ソーシャルメディア">
            <div className="flex flex-col gap-4 pt-6 md:flex-row md:gap-6">
              <a
                href="https://note.com/caffeastore"
                className="inline-flex items-center border-b border-neutral-400 pb-1 text-lg transition-colors hover:border-neutral-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                note
              </a>
              <a
                href="https://www.instagram.com/caffeastore2019"
                className="inline-flex items-center border-b border-neutral-400 pb-1 text-lg transition-colors hover:border-neutral-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                instagram
              </a>
            </div>
          </nav>
        </address>
      </div>

      <footer className="mt-16 text-center">
        <p className="text-sm">© Caffè Astore. All RIGHTS RESERVED.</p>
      </footer>
    </article>
  )
}
