import React, { useEffect, useRef } from 'react';
import { Text, View, Image, Animated, Easing } from 'react-native';

const loadingIcon = require('../../assets/loadingIcon.png');

function Loading() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.Image
        source={loadingIcon}
        style={{
          width: 100,
          height: 100,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
}

export default Loading;
