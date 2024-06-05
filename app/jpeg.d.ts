import { ImageSourcePropType } from 'react-native'

declare module '*.jpeg' {
    const content: ImageSourcePropType
    
    export default content
}