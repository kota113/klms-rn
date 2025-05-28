import {StatusBar} from 'expo-status-bar';
import Navigation from "./components/Navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createTamagui, TamaguiProvider} from "tamagui";
import {config} from "./tamagui.config";

export default function App() {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaProvider>
      <TamaguiProvider config={createTamagui(config)}>
        <Navigation/>
        <StatusBar style="auto"/>
      </TamaguiProvider>
    </SafeAreaProvider>
    // </GestureHandlerRootView>
  );
}
