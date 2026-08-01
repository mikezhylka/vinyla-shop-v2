import Link from "next/link";

interface Props {
  href: string;
}

export default function SectionLink({ href }: Props) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-white transition-colors"
    >
      View All
      <span className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black">
        ↗
      </span>
    </Link>
  );
}
