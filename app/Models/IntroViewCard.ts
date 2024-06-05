import { Image, ImageSourcePropType } from "react-native"

// Model für die Seiten des IntroScreen
export class IntroViewCard {
    id: number
    title: string
    image: ImageSourcePropType
    text: string
}

export default IntroViewCard