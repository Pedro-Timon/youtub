export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  banner: string;
  description: string;
}

export interface VideoItem {
  id: string;
  title: string;
  views: string;
  postedAt: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  channel: Channel;
}

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Como criar um App Expo com Expo Router em 2026',
    views: '120 mil visualizações',
    postedAt: 'há 2 dias',
    duration: '15:24',
    thumbnail: 'https://picsum.photos/seed/video1/400/225',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    channel: {
      id: 'dev_master',
      name: 'Dev Master',
      avatar: 'https://picsum.photos/seed/avatar1/100/100',
      subscribers: '450 mil inscritos',
      banner: 'https://picsum.photos/seed/banner1/800/200',
      description: 'Aprenda desenvolvimento mobile e tecnologia de forma prática.'
    }
  },
  {
    id: '2',
    title: 'Clonando a Interface do YouTube no React Native',
    views: '45 mil visualizações',
    postedAt: 'há 1 semana',
    duration: '08:10',
    thumbnail: 'https://picsum.photos/seed/video2/400/225',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    channel: {
      id: 'ui_craft',
      name: 'UI Craft',
      avatar: 'https://picsum.photos/seed/avatar2/100/100',
      subscribers: '120 mil inscritos',
      banner: 'https://picsum.photos/seed/banner2/800/200',
      description: 'Recriando as melhores interfaces de apps com NativeWind e React Native.'
    }
  }
];