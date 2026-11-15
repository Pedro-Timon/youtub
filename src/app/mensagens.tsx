import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import { Feather, Ionicons } from '@expo/vector-icons';

export default function MensagensScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Superior */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mensagens</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="user-plus" size={22} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="more-vertical" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo Central (Ilustração e Textos baseados na print) */}
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          {/* Balões de chat estilizados com ícones */}
          <View style={styles.chatBubblePrimary}>
            <Ionicons name="play" size={28} color="#ff0000" />
          </View>
          <View style={styles.chatBubbleSecondary}>
            <View style={styles.dotsRow}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Conheça as mensagens diretas</Text>
        <Text style={styles.subtitle}>
          Agora você pode enviar vídeos diretamente no YouTube
        </Text>

        {/* Botão de Ação Principal */}
        <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8}>
          <Text style={styles.inviteButtonText}>Convidar para conversar</Text>
          <Feather name="arrow-right" size={18} color="#000000" style={styles.inviteIcon} />
        </TouchableOpacity>

        <Text style={styles.footerNote}>Cada link pode iniciar um chat</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginBottom: 60,
  },
  illustrationContainer: {
    width: 140,
    height: 100,
    position: 'relative',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBubblePrimary: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 72,
    height: 54,
    backgroundColor: '#ff4e50',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  chatBubbleSecondary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 72,
    height: 54,
    backgroundColor: '#8a2be2',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  inviteButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  inviteIcon: {
    marginLeft: 8,
  },
  footerNote: {
    color: '#717171',
    fontSize: 12,
  },
});