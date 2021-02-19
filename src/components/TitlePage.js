import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

// UI
import LinearGradient from 'react-native-linear-gradient';

const TitlePage = ({
  title,
  subtitle,
  leftSide,
  children,
  subPage = false,
  color = 'white',
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#4D84A0', '#55A7AE', '#67B26F']}
      style={{...styles.container, ...{height: subPage ? 100 : 200}}}>
      <View style={styles.titleWrapper}>
        {title ? (
          <React.Fragment>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {leftSide && <View style={{flex: 1}}>{leftSide}</View>}
              <View style={{flex: 1}}>
                <Text
                  style={{
                    ...styles.title,
                    ...{
                      color: color,
                      fontSize: leftSide ? 15 : 35,
                      textAlign: leftSide ? 'center' : 'left',
                    },
                  }}>
                  {title}
                </Text>
                {subtitle && (
                  <Text
                    style={{
                      ...styles.subtitle,
                      ...{color: color, marginLeft: leftSide ? 0 : 0},
                    }}>
                    {subtitle}
                  </Text>
                )}
              </View>
              {leftSide && <View style={{flex: 1}} />}
            </View>
          </React.Fragment>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo_pm_servicios.png')}
            />
          </View>
        )}
      </View>
      <View style={styles.childrenWrapper}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
  },
  titleWrapper: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  childrenWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 10,
    resizeMode: 'contain',
    margin: 0,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TitlePage;
