import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/caffe-astore/assets/others/machine.jpeg"
          alt="Coffee Machine"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* 背景のオーバーレイ */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ロゴコンテナ */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className={styles.heroLogoEnter}>
          <img
            src="/caffe-astore/assets/logo/logo.svg"
            alt="Caffè Astore"
            className="h-auto w-96 max-w-[90vw] drop-shadow-2xl sm:w-[500px]"
          />
        </div>
      </div>

      {/* スクロール指示 */}
      <div className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 ${styles.heroScrollEnter}`}>
        <div className="animate-bounce">
          <svg className="h-6 w-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
