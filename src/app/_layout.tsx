import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Esconde a barra inferior se estiver na tela de vídeo ou de canal
  const isTabScreen = ['/', '/index', '/shorts', '/inscricoes', '/voce', '/criar'].includes(pathname);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0f0f0f' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="shorts" />
          <Stack.Screen name="inscricoes" />
          <Stack.Screen name="voce" />
          <Stack.Screen name="criar" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="video/[id]" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="channel/[id]" options={{ animation: 'slide_from_right' }} />
        </Stack>
      </View>

      {/* Bottom Navigation Bar Fixo */}
      {isTabScreen && (
        <SafeAreaView edges={['bottom']} style={styles.bottomBarContainer}>
          <View style={styles.bottomBar}>
            {/* 1. Início */}
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => router.push('/')}
            >
              <MaterialIcons
                name="home"
                size={24}
                color={pathname === '/' || pathname === '/index' ? '#ffffff' : '#aaaaaa'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  (pathname === '/' || pathname === '/index') && styles.tabLabelActive,
                ]}
              >
                Início
              </Text>
            </TouchableOpacity>

            {/* 2. Shorts */}
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => router.push('/shorts')}
            >
              <Ionicons
                name="play-sharp"
                size={22}
                color={pathname === '/shorts' ? '#ffffff' : '#aaaaaa'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  pathname === '/shorts' && styles.tabLabelActive,
                ]}
              >
                Shorts
              </Text>
            </TouchableOpacity>

            {/* 3. Botão Criar (+) Central */}
            <TouchableOpacity
              style={styles.createButtonContainer}
              onPress={() => router.push('/criar' as any)}
            >
              <View style={styles.createButtonCircle}>
                <Feather name="plus" size={24} color="#0f0f0f" />
              </View>
            </TouchableOpacity>

            {/* 4. Inscrições */}
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => router.push('/inscricoes')}
            >
              <MaterialIcons
                name="subscriptions"
                size={22}
                color={pathname === '/inscricoes' ? '#ffffff' : '#aaaaaa'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  pathname === '/inscricoes' && styles.tabLabelActive,
                ]}
              >
                Inscrições
              </Text>
            </TouchableOpacity>

            {/* 5. Você (Com Avatar Circular idêntico ao app real) */}
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => router.push('/voce')}
            >
              <View style={[styles.avatarTabContainer, pathname === '/voce' && styles.avatarTabActive]}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
                  style={styles.tabAvatar}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  pathname === '/voce' && styles.tabLabelActive,
                ]}
              >
                Você
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    flex: 1,
  },
  bottomBarContainer: {
    backgroundColor: '#0f0f0f',
    borderTopWidth: 1,
    borderTopColor: '#272727',
  },
  bottomBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  createButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  createButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTabContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTabActive: {
    borderColor: '#ffffff',
  },
  tabAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  tabLabel: {
    color: '#aaaaaa',
    fontSize: 10,
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
} as any);