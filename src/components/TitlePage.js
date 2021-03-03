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
      style={{
        ...styles.container,
        ...{height: subPage ? 100 : 250, paddingTop: children ? 50 : 0},
      }}>
      <View
        style={{
          ...styles.titleWrapper,
          ...{justifyContent: 'center'},
        }}>
        {title ? (
          <React.Fragment>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {leftSide && (
                <View style={{flex: 1, marginTop: 40}}>{leftSide}</View>
              )}
              <View style={{flex: 6}}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    ...styles.title,
                    ...{
                      color: color,
                      marginTop: leftSide ? 40 : 0,
                      // fontSize: leftSide ? 20 : 35,
                      textAlign: leftSide ? 'center' : 'left',
                    },
                  }}>
                  {title}
                </Text>
                {subtitle && !subPage && (
                  <Text
                    style={{
                      ...styles.subtitle,
                      ...{color: color, marginLeft: leftSide ? 0 : 0},
                    }}>
                    {subtitle}
                  </Text>
                )}
                {subtitle && subPage && (
                  <Text
                    style={{
                      ...{color: color, textAlign: 'center', fontSize: 12},
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
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo_pm_servicios.png')}
            />
          </View>
        )}
      </View>
      {children && <View style={styles.childrenWrapper}>{children}</View>}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 0,
  },
  childrenWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 40,
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
