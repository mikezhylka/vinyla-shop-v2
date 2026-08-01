import Image from "next/image";

export function AuthBanner() {
  return (
    <section className="hidden md:flex relative w-1/2 lg:w-3/5 min-h-screen overflow-hidden bg-surface-container-lowest border-r border-white/10">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Ub2kcKGXOE3UwLeg7UGGhSiEb4zzoUtREm4wPPtxYUzy8afLjwSrd-lfN-WPaFfmATExfk4VKH_Re6PRQWFbgZcAGuR7DhXTDJ86fRaTULOlYBqbU67p3GKl17QNLK2F0ArCbU9yLp2J_lMB56hZu8oyzRdVsnNIbcC3MvFOoXaaDdlAsK7Hj3SS-Zy5S5_GToG32JGXQCcvj6HkadliXznZFg4gsjBWDCIpiIpAPzHyAs8Ayro_LSNjiiYbfe03EmjkDEnLkO67"
          alt="Close-up of a high-end vintage vinyl record player"
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          sizes="(max-width: 640px) 0vw, (max-width: 1440px) 50vw, 60vw"
          fill
          priority
        />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-body-background via-body-background/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-linear-to-t from-body-background via-transparent to-transparent z-10"></div>

      <div className="relative z-20 flex flex-col justify-end p-16 w-full animate-on-scroll">
        <div className="max-w-md">
          <h2 className="h2 font-bold text-white mb-6 tracking-tight">
            Your private vault of high-fidelity sound.
          </h2>
          <p className="main-text text-neutral-gray leading-relaxed mb-8">
            Sign in to access your wishlist, track orders and to be able to
            share your opinion
          </p>
        </div>
      </div>
    </section>
  );
}
