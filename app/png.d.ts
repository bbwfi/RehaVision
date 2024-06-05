import { ImageSourcePropType } from 'react-native'

declare module '*.png' {
    const content: ImageSourcePropType
  
    export default content
}