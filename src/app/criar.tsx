import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
import { Feather, Ionicons } from '@expo/vector-icons';

export default function CriarScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'video' | 'shorts' | 'aovivo' | 'post'>('shorts');
  const [postText, setPostText] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* @ts-ignore */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* Header Superior Dinâmico */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Feather name="x" size={24} color="#ffffff" />
        </TouchableOpacity>

        {activeTab === 'post' && (
          <>
            <Text style={styles.headerTitleCenter}>Criar post</Text>
            <TouchableOpacity style={styles.postActionButton}>
              <Text style={styles.postActionText}>Postar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Conteúdo Dinâmico Conforme a Aba Selecionada */}
      <View style={styles.contentBody}>
        {activeTab === 'shorts' && (
          <View style={styles.permissionContainer}>
            <View style={styles.shortsIconCircle}>
              <Ionicons name="flash" size={32} color="#ffffff" />
            </View>
            <Text style={styles.permissionTitle}>
              Para gravar, permita que o YouTube acesse sua câmera e microfone
            </Text>
            <Text style={styles.permissionSubtitle}>
              Mude as permissões a qualquer momento nas configurações do telefone
            </Text>

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Adicionar da Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>Abrir as Configurações</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'video' && (
          <View style={styles.permissionContainer}>
            <Text style={styles.topNoticeText}>
              As fotos e vídeos vão aparecer aqui após você permitir o acesso.
            </Text>
            <TouchableOpacity style={styles.configTopButton}>
              <Text style={styles.configTopButtonText}>Config.</Text>
            </TouchableOpacity>

            <View style={styles.galleryPlaceholderGrid}>
              {[...Array(6)].map((_, i) => (
                <View key={i} style={styles.gridItem} />
              ))}
            </View>

            <TouchableOpacity style={styles.primaryButtonFloating} activeOpacity={0.8}>
              <Feather name="image" size={18} color="#000000" style={{ marginRight: 8 }} />
              <Text style={styles.primaryButtonTextDark}>Selecionar na galeria</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'aovivo' && (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionTitleLarge}>Permitir acesso</Text>
            <Text style={styles.permissionSubtitle}>
              Em "Configurações", permita que o YouTube acesse seu microfone e câmera
            </Text>

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Abrir as Configurações</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'post' && (
          <View style={styles.postContainer}>
            <View style={styles.postUserHeader}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }} 
                style={styles.userAvatar} 
              />
              <View>
                <Text style={styles.userName}>Disconnect</Text>
                <View style={styles.visibilityBadge}>
                  <Feather name="globe" size={12} color="#ffffff" style={{ marginRight: 4 }} />
                  <Text style={styles.visibilityText}>Pública</Text>
                  <Feather name="chevron-down" size={12} color="#ffffff" style={{ marginLeft: 4 }} />
                </View>
              </View>
            </View>

            <TextInput
              style={styles.postInput}
              placeholder="Compartilhe uma prévia do seu próximo vídeo"
              placeholderTextColor="#888888"
              multiline
              value={postText}
              onChangeText={setPostText}
            />

            <View style={styles.postToolbar}>
              <TouchableOpacity style={styles.toolbarIcon}>
                <Feather name="bar-chart-2" size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarIcon}>
                <Feather name="image" size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarIcon}>
                <Feather name="check-square" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Navbar Inferior de Modos de Criação */}
      <View style={styles.createNavbar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('video')}
        >
          <Text style={[styles.navText, activeTab === 'video' && styles.navTextActive]}>
            Vídeo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('shorts')}
        >
          <Text style={[styles.navText, activeTab === 'shorts' && styles.navTextActive]}>
            Shorts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('aovivo')}
        >
          <Text style={[styles.navText, activeTab === 'aovivo' && styles.navTextActive]}>
            Ao vivo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('post')}
        >
          <Text style={[styles.navText, activeTab === 'post' && styles.navTextActive]}>
            Post
          </Text>
        </TouchableOpacity>
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  closeButton: {
    padding: 4,
  },
  headerTitleCenter: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1,
  },
  postActionButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
  },
  postActionText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  permissionContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  shortsIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#272727',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  permissionTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  permissionTitleLarge: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  permissionSubtitle: {
    color: '#aaaaaa',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#0f0f0f',
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  topNoticeText: {
    color: '#aaaaaa',
    fontSize: 13,
    textAlign: 'center',
    position: 'absolute',
    top: 10,
    left: 16,
    right: 80,
  },
  configTopButton: {
    position: 'absolute',
    top: 0,
    right: 16,
    backgroundColor: '#272727',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  configTopButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  galleryPlaceholderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginVertical: 40,
    width: '100%',
  },
  gridItem: {
    width: '31%',
    height: 110,
    backgroundColor: '#1f1f1f',
    borderRadius: 4,
  },
  primaryButtonFloating: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonTextDark: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  postContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  postUserHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  visibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  visibilityText: {
    color: '#ffffff',
    fontSize: 11,
  },
  postInput: {
    color: '#ffffff',
    fontSize: 16,
    textAlignVertical: 'top',
    flex: 1,
    maxHeight: 150,
  },
  postToolbar: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#272727',
  },
  toolbarIcon: {
    padding: 4,
  },
  createNavbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#0f0f0f',
    paddingBottom: 8,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navText: {
    color: '#888888',
    fontSize: 15,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: '#272727',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
} as any);