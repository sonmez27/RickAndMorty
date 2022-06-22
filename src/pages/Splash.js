import React, {useEffect, useRef} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Animated} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Background, FontColor, Container} from '../utils/Color';

const SplashScreen = ({navigation}) => {
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scale, {
      duration: 500,
      toValue: 2,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('Episodes');
      }, 300);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../assets/images/splash.png')}
        style={[{transform: [{scale}]}, styles.logo]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: hp(15),
    height: hp(15),
  },
});
export default SplashScreen;
