import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';

// UI
import TitlePage from './TitlePage';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pageScreen: {
    flex: 1,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
  },
  bottomScreen: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20,
    height: '8%',
  },
});

const PagetLayout = ({
  titleChildren,
  titleProps,
  children,
  footer,
  titleLefSide,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
        <TitlePage {...titleProps} leftSide={titleLefSide}>
          {titleChildren}
        </TitlePage>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#126D9B', '#67B26F']}
          style={styles.pageBackScreen}>
          <View style={styles.pageScreen}>{children}</View>
        </LinearGradient>
      </ScrollView>
      {footer && <View style={styles.bottomScreen}>{footer}</View>}
    </View>
  );
};

export default PagetLayout;
