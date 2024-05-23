import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

// Custom toast component with fading effect
const Toast = ({ visible, message, duration }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // Fade in duration
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Fade out duration
          useNativeDriver: true,
        }).start();
      }, duration - 500); // Subtract fade in duration from total duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (visible) {
    return (
      <Animated.View style={{ opacity: fadeAnim, position: 'absolute', bottom: '5%', alignSelf: 'center' }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 10, padding: 10 }}>
          <Text style={{ color: 'white' }}>{message}</Text>
        </View>
      </Animated.View>
    );
  }
  return null;
};

export default Toast;
