import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg, {Path} from 'react-native-svg';
import {Background, FontColor, Container} from '../utils/Color';

const Character = ({route, navigation}) => {
  const {params} = route;
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await (
        await fetch('https://rickandmortyapi.com/api/character/' + params.id)
      ).json();
      setCharacter(response);
    };
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(3),
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={hp(3)}
            height={hp(3)}
            viewBox="0 0 24 24">
            <Path
              fill={FontColor}
              d="M9.125 21.1L.7 12.7q-.15-.15-.212-.325Q.425 12.2.425 12t.063-.375Q.55 11.45.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L3.55 12l7.35 7.35q.35.35.35.862q0 .513-.375.888t-.875.375q-.5 0-.875-.375Z"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titleText}>Character</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.container}>
          <Image style={styles.img} source={{uri: character.image}} />
          <Text style={styles.nameText}>{character.name}</Text>
          <View style={styles.line} />
          <View
            style={{
              backgroundColor:
                character.status == 'Alive' ? '#70e000' : '#e63946',
              borderRadius: hp(1),
            }}>
            <Text style={styles.text}>{character.status}</Text>
          </View>
          <Text style={styles.text}>{character.species}</Text>
          <Text style={styles.text}>{character.gender}</Text>
          <Text style={styles.text}>{character?.location?.name}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Container,
    borderColor: '#DEDEDE',
    paddingBottom: hp(2),
    width: hp(35),
    borderWidth: hp('0.1'),
    borderRadius: hp(3),
    marginVertical: wp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: hp(35),
    height: hp(35),
    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
  },
  nameText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(4),
    color: FontColor,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.5),
  },
  line: {
    height: hp('0.1'),
    backgroundColor: FontColor,
    width: '75%',
    marginBottom: hp(2),
  },
  text: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(3),
    color: FontColor,
  },
  titleText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(4),
    color: FontColor,
    textAlign: 'center',
    marginLeft: hp(8),
  },
});
export default Character;
