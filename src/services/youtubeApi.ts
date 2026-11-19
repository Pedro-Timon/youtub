
const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchVideos(query: string) {
  if (!API_KEY) {
    throw new Error('Chave da YouTube Data API não encontrada.');
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '20',
    key: API_KEY,
  });

  const response = await fetch(
    `${BASE_URL}/search?${params.toString()}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || 'Erro ao buscar vídeos.'
    );
  }

  const data = await response.json();

  return data.items;
}
