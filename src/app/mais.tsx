import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MaisScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar com as abas de navegação horizontal baseadas na print */}
      <View style={styles.topNav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navScroll}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.navItem}>
            <Text style={styles.navText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/inscricoes')} style={styles.navItem}>
            <Text style={styles.navText}>Inscrições</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/musica')} style={styles.navItem}>
            <Text style={styles.navText}>Música</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ao-vivo')} style={styles.navItem}>
            <Text style={styles.navText}>Ao vivo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Text style={[styles.navText, styles.navTextActive]}>Mais</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Lista de Opções */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.listContainer}>
        
        {/* Grupo 1: Categorias e Exploração */}
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="movie-outline" size={24} color="#ffffff" style={styles.menuIcon} />
          <Text style={styles.menuText}>Filmes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="trending-up" size={24} color="#ffffff" style={styles.menuIcon} />
          <Text style={styles.menuText}>Paradas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="game-controller-outline" size={24} color="#ffffff" style={styles.menuIcon} />
          <Text style={styles.menuText}>Jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="podcast" size={24} color="#ffffff" style={styles.menuIcon} />
          <Text style={styles.menuText}>Podcasts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="controller-classic-outline" size={24} color="#ffffff" style={styles.menuIcon} />
          <Text style={styles.menuText}>Sala de Jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="star-outline" size={24} color="#ffffff" style={styles.menuIcon} />
          <Text style={styles.menuText}>Assinaturas</Text>
        </TouchableOpacity>

        {/* Linha Divisória */}
        <View style={styles.divider} />

        {/* Grupo 2: Ecossistema YouTube */}
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="youtube" size={20} color="#ff0000" style={styles.menuIcon} />
          <Text style={styles.menuText}>YouTube Premium</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="youtube-studio" size={22} color="#ff0000" style={styles.menuIcon} />
          <Text style={styles.menuText}>YouTube Studio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="headphones" size={18} color="#ff0000" style={styles.menuIcon} />
          <Text style={styles.menuText}>YouTube Music</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="youtube-gaming" size={22} color="#ff0000" style={styles.menuIcon} />
          <Text style={styles.menuText}>YouTube Kids</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="video-plus-outline" size={22} color="#ff0000" style={styles.menuIcon} />
          <Text style={styles.menuText}>YouTube Create</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  topNav: {
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
    paddingVertical: 8,
  },
  navScroll: {
    paddingHorizontal: 16,
    gap: 20,
    alignItems: 'center',
  },
  navItem: {
    paddingVertical: 4,
  },
  navItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff0000',
  },
  navText: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    width: 32,
    textAlign: 'center',
    marginRight: 16,
  },
  menuText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#272727',
    marginVertical: 12,
  },
});