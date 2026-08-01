export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Vinyl Record Sales",
    description:
      "Our store offers a vast selection of vinyl records, covering all music genres—from timeless classics to contemporary hits. We also specialize in rare and collectible editions that will make a perfect addition to your collection. Every record is carefully inspected to ensure top-notch sound quality",
    icon: "/images/icons/vinyl-record-light.svg",
  },
  {
    title: "Vinyl Repair and Restoration",
    description:
      "If your records have lost their original sound quality, we can help! Our professional restoration service includes removing scratches, cleaning dust, and fixing damaged sleeves to restore your records to their former glory. We use specialized tools and techniques to ensure the highest level of care",
    icon: "/images/icons/repair.svg",
  },
  {
    title: "Digitizing Old Records to MP3/WAV",
    description:
      "Bring your favorite music into the digital age! We provide professional digitization of your old vinyl records into MP3 or WAV formats. Enjoy the vintage sound on modern devices—convenient and portable",
    icon: "/images/icons/player-play.svg",
  },
  {
    title: "Consultations on Record or Player Selection",
    description:
      "Whether you're a vinyl newcomer or a seasoned collector, we're here to help. Our experts will guide you in choosing the perfect records or turntable based on your musical preferences, technical needs, and budget",
    icon: "/images/icons/circle-help.svg",
  },
];
