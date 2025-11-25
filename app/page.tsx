'use client';

import { useState } from 'react';
import Hero from './components/Hero';
import PageLoader from './components/PageLoader';

// ============================================
// YOUR PORTFOLIO CONTENT
// ============================================

interface WorkItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  video?: string;
  description?: string;
}

// Design work
const designWork: WorkItem[] = [
  {
    id: '1',
    title: 'Event Poster Design',
    category: 'Design',
    image: '/portfolio/design/eventpostertemp.webp',
  },
  {
    id: '2',
    title: 'Nike SB Design',
    category: 'Design',
    image: '/portfolio/design/nikesb.webp',
  },
  {
    id: '3',
    title: 'North Face Magazine',
    category: 'Design',
    image: '/portfolio/design/north+face+magazine.webp',
  },
  {
    id: '4',
    title: 'Patagonia Poster',
    category: 'Design',
    image: '/portfolio/design/Patagonia_poster.webp',
  },
  {
    id: '5',
    title: 'Sticker Bomb Design',
    category: 'Design',
    image: '/portfolio/design/stickerbomb.webp',
  },
  {
    id: '6',
    title: 'World Pass By',
    category: 'Design',
    image: '/portfolio/design/WORLD_PASS_BY.webp',
  },
  {
    id: '7',
    title: 'NB X-90',
    category: 'Design',
    image: '/portfolio/design/NB_X-90.webp',
  },
  {
    id: '8',
    title: 'Design Project 1',
    category: 'Design',
    image: '/portfolio/design/3BA75944-1716-4FC3-B64B-0A38F7BDD753.webp',
  },
  {
    id: '9',
    title: 'Design Project 2',
    category: 'Design',
    image: '/portfolio/design/A54827B6-D5BC-417D-A3A6-24FCD353BE21.webp',
  },
  {
    id: '10',
    title: 'Design Project 3',
    category: 'Design',
    image: '/portfolio/design/AD0E842A-D1B6-402E-BE0E-7A14B34B1CA8.webp',
  },
  {
    id: '11',
    title: 'Fuck What They Say',
    category: 'Design',
    image: '/portfolio/design/FTWS.png',
  },
  {
    id: '12',
    title: 'Greaney Western',
    category: 'Design',
    image: '/portfolio/design/GREANEYBKG.png',
  },
];

// Film work
const filmWork: WorkItem[] = [
  {
    id: '1',
    title: 'GREANEY Film Reel',
    category: 'Film',
    video: 'https://youtu.be/dfN-qBvfQko',
  },
];

// Modeling work
const modelingWork: WorkItem[] = [
  {
    id: '1',
    title: 'Modeling Portfolio 1',
    category: 'Modeling',
    image: '/portfolio/modeling/A15B777C-9A08-49E9-9858-A5E60291B557_1_105_c.jpeg',
  },
  {
    id: '2',
    title: 'Modeling Portfolio 2',
    category: 'Modeling',
    image: '/portfolio/modeling/11458FFE-3F7F-4A27-9658-0A7239016A82.jpeg',
  },
  {
    id: '3',
    title: 'Modeling Portfolio 3',
    category: 'Modeling',
    image: '/portfolio/modeling/14E3BA45-87D5-46B1-86F0-B99095C5B8A7_1_105_c.jpeg',
  },
  {
    id: '4',
    title: 'Modeling Portfolio 4',
    category: 'Modeling',
    image: '/portfolio/modeling/1E3F4541-88F1-455E-A208-784942681DB3.jpeg',
  },
  {
    id: '5',
    title: 'Modeling Portfolio 5',
    category: 'Modeling',
    image: '/portfolio/modeling/32A57B2E-B91D-4C0D-B4DB-7F44AEC7B5F8_1_105_c.jpeg',
  },
  {
    id: '6',
    title: 'Modeling Portfolio 6',
    category: 'Modeling',
    image: '/portfolio/modeling/33238ACF-67D5-4144-9843-E2803F643125_1_105_c.jpeg',
  },
  {
    id: '7',
    title: 'Modeling Portfolio 7',
    category: 'Modeling',
    image: '/portfolio/modeling/4CA29574-F1BE-4311-AFC8-73EFCE3F7986_1_105_c.jpeg',
  },
  {
    id: '8',
    title: 'Modeling Portfolio 8',
    category: 'Modeling',
    image: '/portfolio/modeling/6D0DCE8B-3597-46C8-9E0F-1D34F134039F_1_105_c.jpeg',
  },
  {
    id: '9',
    title: 'Modeling Portfolio 9',
    category: 'Modeling',
    image: '/portfolio/modeling/7CBDD48E-2519-470E-AA0E-66C3C30004EF.jpeg',
  },
  {
    id: '10',
    title: 'Modeling Portfolio 10',
    category: 'Modeling',
    image: '/portfolio/modeling/84BC5987-13E7-48AD-8BC8-E9BCDD523A2C_1_105_c.jpeg',
  },
  {
    id: '11',
    title: 'Modeling Portfolio 11',
    category: 'Modeling',
    image: '/portfolio/modeling/0D69974B-0631-43E3-AF37-8B5DD8266FC3.jpeg',
  },
  {
    id: '12',
    title: 'Modeling Portfolio 12',
    category: 'Modeling',
    image: '/portfolio/modeling/1C0DA720-85DD-46DD-9BF3-D622A30356CF.jpeg',
  },
  {
    id: '13',
    title: 'Modeling Portfolio 13',
    category: 'Modeling',
    image: '/portfolio/modeling/AC4FC461-40D7-418B-A436-AF7612C91820.jpeg',
  },
  {
    id: '14',
    title: 'Modeling Portfolio 14',
    category: 'Modeling',
    image: '/portfolio/modeling/B8B37D15-8EC7-42D1-B4B5-7748F178A13C.jpeg',
  },
  {
    id: '15',
    title: 'Modeling Portfolio 15',
    category: 'Modeling',
    image: '/portfolio/modeling/C5B09572-8C66-4584-8A62-CB16BA75EC35_1_105_c.jpeg',
  },
  {
    id: '16',
    title: 'Modeling Portfolio 16',
    category: 'Modeling',
    image: '/portfolio/modeling/F101178D-8A39-461E-A24D-16D0FF037790_1_105_c.jpeg',
  },
  {
    id: '17',
    title: 'Modeling Portfolio 17',
    category: 'Modeling',
    image: '/portfolio/modeling/F1DFB6F6-228F-4E26-987E-AC21B5F1A0F4.jpeg',
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PageLoader onLoadComplete={() => setIsLoaded(true)} />
      <main className="relative bg-white overflow-hidden" style={{ height: '100vh', overflow: 'hidden' }}>
        <Hero 
          modelingWork={modelingWork}
          filmWork={filmWork}
          designWork={designWork}
          isLoaded={isLoaded}
        />
      </main>
    </>
  );
}
