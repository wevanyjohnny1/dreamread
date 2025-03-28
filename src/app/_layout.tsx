import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../../global.css";
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Hind_300Light: require('../assets/fonts/Hind_300Light.ttf'),
    Hind_400Regular: require('../assets/fonts/Hind_400Regular.ttf'),
    Hind_500Medium: require('../assets/fonts/Hind_500Medium.ttf'),
    Hind_600SemiBold: require('../assets/fonts/Hind_600SemiBold.ttf'),
    Hind_700Bold: require('../assets/fonts/Hind_700Bold.ttf'),

    Poppins_100Thin: require('../assets/fonts/Poppins_100Thin.ttf'),
    Poppins_200ExtraLight: require('../assets/fonts/Poppins_200ExtraLight.ttf'),
    Poppins_200ExtraLight_Italic: require('../assets/fonts/Poppins_200ExtraLight_Italic.ttf'),
    Poppins_300Light: require('../assets/fonts/Poppins_300Light.ttf'),
    Poppins_300Light_Italic: require('../assets/fonts/Poppins_300Light_Italic.ttf'),
    Poppins_400Regular: require('../assets/fonts/Poppins_400Regular.ttf'),
    Poppins_400Regular_Italic: require('../assets/fonts/Poppins_400Regular_Italic.ttf'),
    Poppins_500Medium: require('../assets/fonts/Poppins_500Medium.ttf'),
    Poppins_500Medium_Italic: require('../assets/fonts/Poppins_500Medium_Italic.ttf'),
    Poppins_600SemiBold: require('../assets/fonts/Poppins_600SemiBold.ttf'),
    Poppins_600SemiBold_Italic: require('../assets/fonts/Poppins_600SemiBold_Italic.ttf'),
    Poppins_700Bold: require('../assets/fonts/Poppins_700Bold.ttf'),
    Poppins_700Bold_Italic: require('../assets/fonts/Poppins_700Bold_Italic.ttf'),
    Poppins_800ExtraBold: require('../assets/fonts/Poppins_800ExtraBold.ttf'),
    Poppins_800ExtraBold_Italic: require('../assets/fonts/Poppins_800ExtraBold_Italic.ttf'),
    Poppins_900Black: require('../assets/fonts/Poppins_900Black.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Slot />
    </GluestackUIProvider>
  );
}
