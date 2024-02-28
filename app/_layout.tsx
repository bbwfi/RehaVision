



	import { useFonts } from 'expo-font';
  import { SplashScreen, Stack } from 'expo-router';
  import { useEffect } from 'react';
  import { TamaguiProvider } from 'tamagui';

  import config from '../tamagui.config';

	import { Stack } from "expo-router";

export default function Layout() {

  
  	const [loaded] = useFonts({
			Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
			InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
		});

		useEffect(() => {
			if (loaded) {
				SplashScreen.hideAsync();
			}
		}, [loaded]);

		if (!loaded) return null;
  

	return (
		
			<TamaguiProvider config={config}>
		
		    <Stack />
		
			</TamaguiProvider>
		
	);
}
