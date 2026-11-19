
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@youtube_clone:watch_history';

export async function getWatchHistory(): Promise<string[]> {
  try {
    const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory: unknown = JSON.parse(storedHistory);

    if (
      Array.isArray(parsedHistory) &&
      parsedHistory.every((id) => typeof id === 'string')
    ) {
      return parsedHistory;
    }

    return [];
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    return [];
  }
}

export async function addToWatchHistory(videoId: string): Promise<void> {
  try {
    const history = await getWatchHistory();

    // Coloca o vídeo mais recente no início e evita duplicatas.
    const updatedHistory = [
      videoId,
      ...history.filter((id) => id !== videoId),
    ].slice(0, 50);

    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
  }
}
