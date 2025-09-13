export default function Master() {
  return (
    <article className="relative bg-emerald-800 pb-20">
      <div className="font-josefin sticky top-0 cursor-default px-2 py-6 text-[21vw] text-green-900 md:px-6 md:py-12">
        <p className="leading-[0.9] blur-xs md:blur-lg">MODERN</p>
        <p className="leading-[0.9] blur-xs md:pl-28 md:blur-lg">CLASSIC</p>
        <p className="leading-[0.9] blur-xs md:blur-lg">ASTORE</p>
      </div>
      <section className="relative z-10 flex flex-col space-y-16 md:mt-32 md:pb-36">
        <img
          className="aspect-[1/1] max-h-96 w-10/12 rounded-r-full object-cover object-top md:aspect-[2/1] md:max-h-[30rem] md:w-10/12 md:max-w-7xl"
          src="/caffe-astore/assets/others/master.jpeg"
          alt="オーナー岡本高明の写真"
        />
        <div className="space-y-8 px-4 text-white/90 md:space-y-10 md:px-10 lg:space-y-12">
          <header>
            <h2 className="font-josefin text-2xl md:text-3xl">Takaaki Okamoto</h2>
            <p className="text-lg md:text-xl">岡本高明</p>
          </header>
          <p className="max-w-2xl text-lg leading-[2] md:text-xl">
            エスプレッソの美味しさに魅了されイタリアのカフェ文化に強い関心を抱くようになったという。
            <br />
            複数のカフェ・喫茶店でアルバイトを経験し大学卒業後は北浜と北新地にある人気のイタリア料理店に就職。
            <br />
            約2年間働いたのち本場イタリアへ。
          </p>
        </div>
      </section>
    </article>
  )
}
