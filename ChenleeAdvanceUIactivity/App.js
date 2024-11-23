import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

// Higher-Order Component for Logging
const withLogging = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log(`${WrappedComponent.displayName || WrappedComponent.name || 'Component'} Mounted`);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

// Custom Button Component
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Enhanced Button with Logging
const EnhancedButton = withLogging(CustomButton);

// Main App Component
const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    fadeAnim.setValue(0); // Reset the fade animation value
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const startAnimation = () => {
    translateAnim.setValue(0); // Reset the translate animation value
    Animated.timing(translateAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chenlee Ebdao Reanimated App</Text>

      {/* Enhanced Button */}
      <EnhancedButton title="Click Me" onPress={() => console.log('Button Pressed')} />

      {/* Fading Effect */}
      <Animated.View style={[styles.fadingBox, { opacity: fadeAnim }]} />
      <CustomButton title="Fade In" onPress={fadeIn} />

      {/* Smooth Transition */}
      <Animated.View style={{ transform: [{ translateY: translateAnim }] }}>
        <View style={styles.transitionBox} />
      </Animated.View>
      <CustomButton title="Start Animation" onPress={startAnimation} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Light cyan background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00796B', // Teal color for the title
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FF4081', // Pink color for buttons
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fadingBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FFEB3B', // Yellow color for the fading box
    borderRadius: 10,
    marginVertical: 20,
  },
  transitionBox: {
    width: 100,
    height: 100,
    backgroundColor: '#3F51B5', // Indigo color for the transitioning box
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default App;