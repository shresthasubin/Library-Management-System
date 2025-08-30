import { Stack } from "expo-router";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'


export default function RootLayout() {
  return (
    <>
    <GestureHandlerRootView>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/> 
        <Stack.Screen name="/(drawer)/login" options={{headerShown: false}}/> 
      </Stack>
    </GestureHandlerRootView>
      <Toast/>
    </>
  )
}

{/* <Stack initialRouteName='login' screenOptions={{headerShown: false}}/> */}