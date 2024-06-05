import { ImageSourcePropType } from 'react-native'

declare module '*.jpg' {
    const path: ImageSourcePropType;
    export default path;
}
