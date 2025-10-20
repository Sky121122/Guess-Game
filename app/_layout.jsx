import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return <>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" ></Stack.Screen>
      <Stack.Screen name="wrong" ></Stack.Screen>
      <Stack.Screen name="win" ></Stack.Screen>
    </Stack>
  </>;
}
