"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useScroll } from "@/shared/lib/hooks/use-scroll";
import PopularProducts from "@/app/_components/PopularProducts";
import ServiceFeedbacks from "@/app/_components/ServiceFeedbacks";
import SectionLink from "@/app/_components/SectionLink";

interface Props {
  popularProducts:
    | {
        success: boolean;
        message: string;
        data?: undefined;
      }
    | {
        success: boolean;
        data: any;
        message?: undefined;
      };
}

export default function HomePage({ popularProducts }: Props) {
  const router = useRouter();

  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <main>
      <div className="flex h-[calc(100vh-36px)] flex-col items-center justify-center md:justify-start px-4 bg-[url('/images/banners/hero-section-banner.png')] bg-bottom bg-no-repeat bg-size-[100%] md:bg-size-[90%] lg:bg-size-[65%] pb-25 md:pb-0">
        <p className="m-0 pt-0 text-white md:pt-5.5 lg:pt-20 text-[10px] uppercase tracking-[0.3em] font-bold">
          Vinyla Corner
        </p>
        <h1 className="m-0 py-6 text-center h1 text-3xl md:text-6xl font-bold leading-[1.1] text-white tracking-tight">
          Vinyla Corner: Where Music Spins Its{" "}
          <br className="hidden md:block" />
          <span className="text-white italic font-serif font-medium">
            Best Stories!
          </span>
        </h1>
        <p className="m-0 text-center text-sm text-neutral-gray max-w-xl leading-relaxed">
          Dive into timeless melodies at our vinyl shop, where classic tunes
          await
        </p>
        <button className="flex items-center justify-center w-54 h-14 mt-12 md:mt-20 rounded-full bg-primary text-on-primary transition-transform hover:scale-105 active:scale-95 font-bold uppercase tracking-widest text-[12px] p-0 border-none">
          <Link
            href="/catalog"
            className="flex h-full w-full items-center justify-center text-inherit no-underline"
          >
            Buy Now
          </Link>
        </button>
      </div>

      {/* SECTION: Vinyla Corner */}
      <section className="main-grid animate-on-scroll py-10 lg:pt-32">
        {/* Title Wrap */}
        <div className="col-span-full mt-10 mb-8 flex items-center justify-between border-b border-white/10 pb-6 md:mb-12 lg:col-start-2 lg:col-end-12 lg:my-0 lg:row-start-1">
          <h3 className="m-0 text-2xl font-bold tracking-tight text-white lg:text-4xl">
            Vinyla Corner
          </h3>
          <Link
            href="/services"
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-white transition-colors"
          >
            Read More
            <span className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black">
              ↗
            </span>
          </Link>
        </div>

        {/* Welcome Text */}
        <p className="col-span-full m-0 pt-6 font-medium text-white text-lg leading-relaxed lg:col-start-2 lg:col-span-5 lg:block lg:py-12 lg:pb-10 lg:row-start-2">
          Welcome to Vinyla Corner, where music meets nostalgia in every groove.
          Explore our curated collection of timeless vinyl records, spanning
          genres from classic rock to indie gems. Immerse yourself in the rich
          sound and tactile experience of vinyl as you browse through our
          carefully selected titles.
        </p>

        {/* Guide Text */}
        <p className="col-span-full m-0 py-6 text-neutral-gray leading-relaxed lg:col-start-8 lg:-col-end-2 lg:block lg:pt-12 lg:row-start-2">
          Our knowledgeable staff is here to guide you, whether you're a
          seasoned collector or just beginning your vinyl journey. Discover the
          magic of Vinyla Corner - where the love for music is timeless, and
          every record tells a story.
        </p>
      </section>

      {/* SECTION: Popular Positions */}
      <section className="main-grid py-10 lg:pt-32">
        {/* Title Wrap */}
        <div className="col-span-full flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 lg:mb-12 md:row-start-1 gap-4 lg:col-start-2 lg:-col-end-2">
          <h5 className="m-0 text-2xl font-bold tracking-tight text-white lg:text-4xl">
            The most popular positions
          </h5>
          <SectionLink href="/catalog" />
        </div>

        {/* Intro Text */}
        <p className="col-span-full m-0 text-neutral-gray leading-relaxed text-base lg:text-lg mb-8 lg:mb-12 md:row-start-2 lg:col-start-2 lg:col-span-7">
          Discover our Vinyl Corner Shop's most sought-after treasures! From
          classic rock legends to rare jazz gems, our curated collection
          features the most popular vinyl records that capture the essence of
          musical nostalgia.
        </p>

        <PopularProducts
          products={popularProducts.data.slice(0, 2)}
          gridClasses={[
            "col-span-2 lg:col-start-2 lg:col-span-3",
            "col-span-2 lg:col-start-5 lg:col-span-3",
          ]}
        />

        <PopularProducts
          products={popularProducts.data.slice(2)}
          gridClasses={[
            "col-span-2 lg:col-start-6 lg:col-span-3 lg:row-start-3", // 3
            "col-span-2 lg:col-start-9 lg:col-span-3 lg:row-start-3", // 4
          ]}
        />

        {/* View All Circle Button */}
        <button
          className="col-span-full md:col-span-2 aspect-square flex w-full max-w-75 md:max-w-none mx-auto items-center justify-center rounded-full border border-white/10 bg-surface-container-lowest p-0 text-base font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/5 hover:border-white/30 lg:row-start-3 lg:col-start-2 lg:col-span-4 lg:text-[28px] cursor-pointer mt-8 md:mt-0"
          onClick={() => router.push("/catalog")}
        >
          View all
        </button>
      </section>

      <ServiceFeedbacks />
    </main>
  );
}
