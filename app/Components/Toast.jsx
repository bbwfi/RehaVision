import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Toast = ({ visible, message, duration = 3000, type, position = 'bottom', onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShowToast(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (duration !== 0) {
          timerRef.current = setTimeout(() => hideToast(), duration);
        }
      });
    }
  }, [visible]);

  const hideToast = () => {
    clearTimeout(timerRef.current);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowToast(false);
      onHide && onHide();
    });
  };

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      default:
        return styles.default;
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: '10%' };
      case 'center':
        return { top: '45%' };
      default:
        return { bottom: '17%' };
    }
  };

  return (
    showToast && (
      <Animated.View
        style={[
          styles.container,
          getPositionStyle(),
          getToastStyle(),
          { opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={hideToast}>
          <View style={styles.toastContainer}>
            <MaterialIcons name={getIconName()} size={20} color="white" style={styles.icon} />
            <Text style={styles.toastText}>{message}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastContainer: {
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastText: {
    color: 'white',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  success: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)', // Green
  },
  error: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)', // Red
  },
  warning: {
    backgroundColor: 'rgba(255, 152, 0, 0.8)', // Orange
  },
  default: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black
  },
});

export default Toast;