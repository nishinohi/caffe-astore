import { useEffect, useRef, useState } from 'react'

export default function Concept() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/caffe-astore/assets/others/menu-book.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* コンテンツ */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          {/* Modern Classic タイトル */}
          <h2 className="font-josefin mb-12 text-3xl tracking-widest text-white md:mb-16 md:text-4xl lg:mb-24 lg:text-5xl">
            Modern Classic
          </h2>

          {/* コンセプト文 */}
          <div
            className={`transform transition-all delay-300 duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            <p className="text-base leading-9 text-white/90 md:text-xl md:leading-12 lg:text-2xl lg:leading-16">
              厳選した豆から抽出するエスプレッソ。
              <br />
              イタリアンバールの伝統を受け継ぎながら
              <br />
              季節の果実やハーブを使った独創的なモクテルをはじめ、
              <br />
              カクテルやお好みに合わせた一杯とドルチェのペアリングを楽しめます。
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
