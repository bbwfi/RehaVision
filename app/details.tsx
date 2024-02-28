
  import React from "react";
  import { Stack, useRouter } from "expo-router";
	import { Button, Text, YStack } from "tamagui";
	import { Container, Main, Subtitle, Title } from "../tamagui.config";

import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function Details() {
	const { name } = useLocalSearchParams();
  const router = useRouter();

  

		const BackButton = () => (
			<Button unstyled flexDirection="row" backgroundColor="transparent" paddingLeft={0} pressStyle={{ opacity: 0.5 }} onPress={router.back} icon={<Feather name="chevron-left" size={16} color="#007AFF" />}><Text color="#007AFF">Back</Text></Button>
		)
	

	return (
		
			<Container>
        <Stack.Screen options={{ title: "Details", headerLeft: () => <BackButton /> }} />
				<Main>
					<YStack>
						<Title>Details</Title>
						<Subtitle>Showing details for user {name}.</Subtitle>
					</YStack>
				</Main>
			</Container>
		
	);
}


