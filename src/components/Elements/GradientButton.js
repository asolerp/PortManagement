import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({colors, wrapperStyle, ...args}) => {
  return (
    <View style={{...styles.container, ...wrapperStyle}}>
      <LinearGradient
        colors={colors}
        style={styles.gradientButton}
        start={{y: 0.0, x: 0.0}}
        end={{y: 0.0, x: 1.0}}>
        <Button style={styles.loginButton} color="white" {...args} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientButton: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 20,
    flex: 1,
    textAlign: 'center',
  },
});

export default GradientButton;
