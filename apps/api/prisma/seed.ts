import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Product } from '../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products: Omit<Product, 'id'>[] = [
  {
    name: 'The Dark Side of the Moon',
    label: 'Pink Floyd Records',
    description:
      'The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd, released on 1 March 1973 by Harvest Records. It is one of the best-selling albums of all time, famous for its deep philosophical lyrics, sonic experimentation, and iconic prism album cover.',
    barcode: '0190295996918',
    photo: '',
    price: 65,
  },
  {
    name: 'Abbey Road',
    label: 'Apple Records',
    description:
      'Abbey Road is the eleventh studio album by the English rock band the Beatles, released on 26 September 1969 by Apple Records. It was the last album the group started recording, and is known for its medley on side two.',
    barcode: '0602508007446',
    photo: '',
    price: 55,
  },
  {
    name: 'Random Access Memories',
    label: 'Columbia Records',
    description:
      'Random Access Memories is the fourth and final studio album by the French electronic music duo Daft Punk, released on 17 May 2013. It pays tribute to late 1970s and early 1980s American music, particularly from Los Angeles.',
    barcode: '0888837168618',
    photo: '',
    price: 80,
  },
  {
    name: 'Rumours',
    label: 'Warner Records',
    description:
      "Rumours is the eleventh studio album by British-American rock band Fleetwood Mac, released on 4 February 1977. It features emotional, pop-rock tracks largely written about the band's internal relationship struggles.",
    barcode: '0081227967784',
    photo: '',
    price: 50,
  },
  {
    name: 'Thriller',
    label: 'Epic Records',
    description:
      'Thriller is the sixth studio album by American singer Michael Jackson, released on November 30, 1982. It remains the best-selling album of all time, blending pop, rock, and R&B elements seamlessly.',
    barcode: '0886973533918',
    photo: '',
    price: 60,
  },
  {
    name: 'Kind of Blue',
    label: 'Columbia Records',
    description:
      'Kind of Blue is a studio album by American jazz trumpeter Miles Davis, released on August 17, 1959. Regarded as a masterpiece, it is often cited as the greatest jazz record ever made, defining the modal jazz subgenre.',
    barcode: '0886976805715',
    photo: '',
    price: 55,
  },
  {
    name: 'Nevermind',
    label: 'DGC Records',
    description:
      'Nevermind is the second studio album by American rock band Nirvana, released on September 24, 1991. The album brought alternative rock to a mainstream audience, spearheaded by the single "Smells Like Teen Spirit".',
    barcode: '0720642442517',
    photo: '',
    price: 70,
  },
  {
    name: 'To Pimp a Butterfly',
    label: 'Top Dawg Entertainment',
    description:
      'To Pimp a Butterfly is the third studio album by American rapper Kendrick Lamar, released on March 15, 2015. It incorporates elements of jazz, funk, and soul, exploring deeply personal and political themes.',
    barcode: '0602547311009',
    photo: '',
    price: 90,
  },
  {
    name: 'Back to Black',
    label: 'Island Records',
    description:
      "Back to Black is the second and final studio album by English singer Amy Winehouse, released in October 2006. It features a modern take on classic 1960s soul and R&B, highlighted by Winehouse's incredible vocal performance.",
    barcode: '0602517340449',
    photo: '',
    price: 65,
  },
  {
    name: 'OK Computer',
    label: 'Parlophone',
    description:
      'OK Computer is the third studio album by English rock band Radiohead, released in May 1997. The album marked a shift from their earlier guitar-driven sound to more experimental, atmospheric rock with themes of alienation.',
    barcode: '0724385522918',
    photo: '',
    price: 75,
  },
  {
    name: 'Currents',
    label: 'Modular Recordings',
    description:
      "Currents is the third studio album by Australian musical project Tame Impala, released in July 2015. The album shifted the band's style from psychedelic rock toward more dance-oriented, synth-pop sounds.",
    barcode: '0602547306777',
    photo: '',
    price: 85,
  },
  {
    name: 'Igor',
    label: 'Columbia Records',
    description:
      'Igor is the fifth studio album by American rapper and producer Tyler, the Creator, released in May 2019. Entirely produced by Tyler, it blends R&B, funk, and hip hop to tell the story of a complex love triangle.',
    barcode: '0190759652218',
    photo: '',
    price: 75,
  },
  {
    name: 'The Rise and Fall of Ziggy Stardust',
    label: 'RCA Records',
    description:
      'The Rise and Fall of Ziggy Stardust and the Spiders from Mars is the fifth studio album by English musician David Bowie, released in 1972. It is a legendary glam rock concept album about an alien rock superstar.',
    barcode: '0825646287376',
    photo: '',
    price: 80,
  },
  {
    name: 'Illmatic',
    label: 'Columbia Records',
    description:
      'Illmatic is the debut studio album by American rapper Nas, released on April 19, 1994. It is widely considered one of the greatest and most influential hip hop albums of all time, defining East Coast hip hop.',
    barcode: '0889854728511',
    photo: '',
    price: 70,
  },
  {
    name: 'Discovery',
    label: 'Virgin Records',
    description:
      'Discovery is the second studio album by French electronic music duo Daft Punk, released in 2001. It moved away from the Chicago house sound of their debut, focusing more on disco, post-disco, and synth-pop.',
    barcode: '0724384960612',
    photo: '',
    price: 95,
  },
  {
    name: 'Good Kid, M.A.A.D City',
    label: 'Top Dawg Entertainment',
    description:
      'Good Kid, M.A.A.D City is the second studio album by American rapper Kendrick Lamar, released in 2012. Billed as a "short film by Kendrick Lamar," it details his experiences growing up in Compton.',
    barcode: '0602537235079',
    photo: '',
    price: 85,
  },
  {
    name: 'A Love Supreme',
    label: 'Impulse!',
    description:
      "A Love Supreme is a studio album by American jazz saxophonist John Coltrane, recorded in 1964. It is a four-part suite that expresses Coltrane's deep spiritual awakening and gratitude to God.",
    barcode: '0602547164094',
    photo: '',
    price: 60,
  },
  {
    name: 'In the Court of the Crimson King',
    label: 'Island Records',
    description:
      'In the Court of the Crimson King is the debut studio album by English rock band King Crimson, released in 1969. It is considered one of the first and most influential progressive rock albums ever recorded.',
    barcode: '0633367196918',
    photo: '',
    price: 75,
  },
  {
    name: 'Blonde',
    label: "Boys Don't Cry",
    description:
      'Blonde is the second studio album by American singer Frank Ocean, released in 2016. The album features an experimental, minimalist sound incorporating R&B, avant-garde soul, and psychedelic pop.',
    barcode: '0883958014219',
    photo: '',
    price: 250,
  },
  {
    name: 'Songs in the Key of Life',
    label: 'Tamla',
    description:
      'Songs in the Key of Life is the eighteenth studio album by American singer, songwriter, and musician Stevie Wonder, released in 1976. It is an expansive double album covering topics of love, relationships, and social issues.',
    barcode: '0600753082218',
    photo: '',
    price: 120,
  },
  {
    name: 'Demon Days',
    label: 'Parlophone',
    description:
      'Demon Days is the second studio album by British virtual band Gorillaz, released in 2005. It features a darker, alternative hip hop sound and includes the hit singles "Feel Good Inc." and "DARE".',
    barcode: '0724387383814',
    photo: '',
    price: 85,
  },
  {
    name: 'Madvillainy',
    label: 'Stones Throw Records',
    description:
      'Madvillainy is the only studio album by American hip hop duo Madvillain, consisting of rapper MF DOOM and producer Madlib. Released in 2004, it is highly acclaimed for its complex lyricism and innovative production.',
    barcode: '0659457206512',
    photo: '',
    price: 90,
  },
  {
    name: 'The Velvet Underground & Nico',
    label: 'Verve Records',
    description:
      'The Velvet Underground & Nico is the debut album by American rock band the Velvet Underground and German singer Nico, released in 1967. Famous for its Andy Warhol banana cover, it heavily influenced avant-garde and punk rock.',
    barcode: '0600753381618',
    photo: '',
    price: 65,
  },
  {
    name: 'Led Zeppelin IV',
    label: 'Atlantic Records',
    description:
      'The untitled fourth studio album by English rock band Led Zeppelin, commonly known as Led Zeppelin IV, was released in 1971. It features some of their most famous tracks, including the epic "Stairway to Heaven".',
    barcode: '0081227965773',
    photo: '',
    price: 55,
  },
  {
    name: 'Is This It',
    label: 'RCA Records',
    description:
      'Is This It is the debut studio album by American rock band The Strokes, released in 2001. The album played a crucial role in the garage rock revival of the early 2000s, known for its raw, melodic sound.',
    barcode: '0886973356517',
    photo: '',
    price: 60,
  },
  {
    name: 'Kid A',
    label: 'Parlophone',
    description:
      'Kid A is the fourth studio album by English rock band Radiohead, released in 2000. It marked a massive stylistic shift, incorporating electronic music, ambient, krautrock, and jazz influences.',
    barcode: '0634904078218',
    photo: '',
    price: 80,
  },
  {
    name: 'Channel Orange',
    label: 'Def Jam Recordings',
    description:
      "Channel Orange is the debut studio album by American R&B singer Frank Ocean, released in 2012. The album is lauded for its unconventional musical style, cinematic structure, and Ocean's storytelling.",
    barcode: '0602537125363',
    photo: '',
    price: 95,
  },
  {
    name: 'Blue Lines',
    label: 'Wild Bunch',
    description:
      'Blue Lines is the debut studio album by English electronic music group Massive Attack, released in 1991. It is widely considered the first trip hop album, fusing elements of hip hop, dub, soul, and reggae.',
    barcode: '0724386228116',
    photo: '',
    price: 70,
  },
  {
    name: 'Pet Sounds',
    label: 'Capitol Records',
    description:
      'Pet Sounds is the eleventh studio album by American rock band the Beach Boys, released in 1966. Arranged entirely by Brian Wilson, it is universally acclaimed for its revolutionary baroque pop orchestrations.',
    barcode: '0602547822291',
    photo: '',
    price: 60,
  },
  {
    name: 'Tapestry',
    label: 'Ode Records',
    description:
      'Tapestry is the second studio album by American singer-songwriter Carole King, released in 1971. It is one of the best-selling albums of all time, cherished for its warm, intimate, and deeply personal songcraft.',
    barcode: '0886976856519',
    photo: '',
    price: 50,
  },
];

async function main() {
  const genres = await prisma.genre.findMany({});

  if (genres.length === 0) {
    console.warn('No genres found. Please seed genres first.');

    return;
  }

  for (const product of products) {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];

    await prisma.product.create({
      data: { ...product, genres: { connect: { id: randomGenre.id } } },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
