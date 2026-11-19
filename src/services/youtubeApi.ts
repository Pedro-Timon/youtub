
import type { VideoItem } from '../constants/mockData';

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function apiRequest(endpoint: string, params: Record<string, string>) {
  if (!API_KEY) {
    throw new Error('Chave da YouTube Data API não encontrada.');
  }

  const queryParams = new URLSearchParams({
    ...params,
    key: API_KEY,
  });

  const response = await fetch(
    `${BASE_URL}/${endpoint}?${queryParams.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || 'Erro ao consultar a YouTube Data API.'
    );
  }

  return data;
}

// Pesquisa vídeos pelo termo informado.
export async function searchVideos(query: string) {
  const data = await apiRequest('search', {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '20',
  });

  return data.items;
}

// Converte a duração ISO do YouTube para o formato HH:MM:SS.
function formatDuration(duration: string): string {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return '00:00';

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Recupera vídeos populares e informações dos canais.
export async function getPopularVideos(): Promise<VideoItem[]> {
  const videoData = await apiRequest('videos', {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    regionCode: 'BR',
    maxResults: '20',
  });

  const channelIds = [
    ...new Set(
      videoData.items.map((video: any) => video.snippet.channelId)
    ),
  ];

  const channelData = await apiRequest('channels', {
    part: 'snippet,statistics,brandingSettings',
    id: channelIds.join(','),
  });

  const channelsMap = new Map(
    channelData.items.map((channel: any) => [
      channel.id,
      channel,
    ])
  );

  return videoData.items.map((video: any): VideoItem => {
    const channel = channelsMap.get(video.snippet.channelId) as any;

    const thumbnail =
      video.snippet.thumbnails.high?.url ||
      video.snippet.thumbnails.medium?.url ||
      video.snippet.thumbnails.default?.url;

    const channelAvatar =
      channel?.snippet.thumbnails.medium?.url ||
      channel?.snippet.thumbnails.default?.url ||
      thumbnail;

    const banner =
      channel?.brandingSettings.image?.bannerExternalUrl ||
      thumbnail;

    const views = Number(video.statistics.viewCount || 0);

    return {
      id: video.id,
      title: video.snippet.title,
      views: `${new Intl.NumberFormat('pt-BR', {
        notation: 'compact',
      }).format(views)} visualizações`,
      postedAt: new Date(video.snippet.publishedAt).toLocaleDateString('pt-BR'),
      duration: formatDuration(video.contentDetails.duration),
      thumbnail,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      channel: {
        id: video.snippet.channelId,
        name: video.snippet.channelTitle,
        avatar: channelAvatar,
        subscribers: `${channel?.statistics.subscriberCount || '0'} inscritos`,
        banner,
        description: channel?.snippet.description || '',
      },
    };
  });
}

// Recupera os dados de um vídeo específico pelo ID.
export async function getVideoById(videoId: string): Promise<VideoItem | null> {
  const videoData = await apiRequest('videos', {
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  });

  if (!videoData.items || videoData.items.length === 0) {
    return null;
  }

  const video = videoData.items[0];

  // Busca as informações do canal.
  const channelData = await apiRequest('channels', {
    part: 'snippet,statistics,brandingSettings',
    id: video.snippet.channelId,
  });

  const channel = channelData.items?.[0];

  const thumbnail =
    video.snippet.thumbnails.high?.url ||
    video.snippet.thumbnails.medium?.url ||
    video.snippet.thumbnails.default?.url;

  const channelAvatar =
    channel?.snippet.thumbnails.medium?.url ||
    channel?.snippet.thumbnails.default?.url ||
    thumbnail;

  const views = Number(video.statistics.viewCount || 0);

  return {
    id: video.id,
    title: video.snippet.title,
    views: `${new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
    }).format(views)} visualizações`,
    postedAt: new Date(video.snippet.publishedAt).toLocaleDateString('pt-BR'),
    duration: formatDuration(video.contentDetails.duration),
    thumbnail,
    videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
    channel: {
      id: video.snippet.channelId,
      name: video.snippet.channelTitle,
      avatar: channelAvatar,
      subscribers: `${channel?.statistics?.subscriberCount || '0'} inscritos`,
      banner:
        channel?.brandingSettings?.image?.bannerExternalUrl || thumbnail,
      description: channel?.snippet?.description || '',
    },
  };
}

// Recupera os dados de um canal e seus vídeos publicados.
export async function getChannelById(channelId: string): Promise<{
  channel: VideoItem['channel'];
  videoCount: number;
  videos: VideoItem[];
} | null> {
  const channelData = await apiRequest('channels', {
    part: 'snippet,statistics,brandingSettings,contentDetails',
    id: channelId,
  });

  const channel = channelData.items?.[0];

  if (!channel) {
    return null;
  }

  const uploadsPlaylistId =
    channel.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    return null;
  }

  const playlistData = await apiRequest('playlistItems', {
    part: 'contentDetails',
    playlistId: uploadsPlaylistId,
    maxResults: '20',
  });

  const videoIds = (playlistData.items || [])
    .map((item: any) => item.contentDetails?.videoId)
    .filter((id: unknown): id is string => typeof id === 'string');

  const thumbnail =
    channel.snippet.thumbnails.high?.url ||
    channel.snippet.thumbnails.medium?.url ||
    channel.snippet.thumbnails.default?.url ||
    '';

  const channelInfo: VideoItem['channel'] = {
    id: channel.id,
    name: channel.snippet.title,
    avatar: thumbnail,
    subscribers: `${new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
    }).format(Number(channel.statistics?.subscriberCount || 0))} inscritos`,
    banner:
      channel.brandingSettings?.image?.bannerExternalUrl || thumbnail,
    description: channel.snippet.description || '',
  };

  if (videoIds.length === 0) {
    return {
      channel: channelInfo,
      videoCount: Number(channel.statistics?.videoCount || 0),
      videos: [],
    };
  }

  const videoData = await apiRequest('videos', {
    part: 'snippet,contentDetails,statistics',
    id: videoIds.join(','),
  });

  const videos: VideoItem[] = (videoData.items || []).map((video: any) => {
    const views = Number(video.statistics?.viewCount || 0);

    return {
      id: video.id,
      title: video.snippet.title,
      views: `${new Intl.NumberFormat('pt-BR', {
        notation: 'compact',
      }).format(views)} visualizações`,
      postedAt: new Date(video.snippet.publishedAt).toLocaleDateString('pt-BR'),
      duration: formatDuration(video.contentDetails.duration),
      thumbnail:
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.medium?.url ||
        video.snippet.thumbnails.default?.url ||
        '',
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      channel: channelInfo,
    };
  });

  const videosMap = new Map(videos.map((video) => [video.id, video]));

  return {
    channel: channelInfo,
    videoCount: Number(channel.statistics?.videoCount || 0),
    videos: videoIds
      .map((id: string) => videosMap.get(id))
      .filter((video: VideoItem | undefined): video is VideoItem => video !== undefined),
  };
}