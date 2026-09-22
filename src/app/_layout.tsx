import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Esconde a barra inferior se estiver na tela de vídeo ou de canal
  const isTabScreen = ['/', '/index', '/shorts', '/inscricoes', '/voce'].includes(pathname);

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
          <Stack.Screen name="video/[id]" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="channel/[id]" options={{ animation: 'slide_from_right' }} />
        </Stack>
      </View>

      {/* Bottom Navigation Bar Fixo */}
      {isTabScreen && (
        <SafeAreaView edges={['bottom']} style={styles.bottomBarContainer}>
          <View style={styles.bottomBar}>
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

            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => router.push('/shorts')}
            >
              <Ionicons
                name="flash-outline"
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

            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => router.push('/voce')}
            >
              <Feather
                name="user"
                size={22}
                color={pathname === '/voce' ? '#ffffff' : '#aaaaaa'}
              />
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
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
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
});