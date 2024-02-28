
	import { YStack } from "tamagui";
	import { Container, Main, Title, Subtitle, Button, ButtonText } from '../tamagui.config';

import { Stack } from "expo-router";

import { Link } from "expo-router";

export default function Page() {
  

  

	return (
		
			<Container>
				<Main>
          <Stack.Screen options={{ title: "Overview" }} />
          <YStack>
            <Title>Hello World</Title>
            <Subtitle>This is the first page of your app.</Subtitle>
          </YStack>
          <Link href={{ pathname: "/details", params: { name: "Dan" } }} asChild>
            <Button><ButtonText>Show Details</ButtonText></Button>
          </Link>
				</Main>
			</Container>
		
	);
}


