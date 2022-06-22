import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
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

const EpisodeDetail = ({route, navigation}) => {
  const {params} = route;
  const [characters, setCharacters] = useState([]);
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await (
        await fetch('https://rickandmortyapi.com/api/episode/' + params.id)
      ).json();
      setEpisode(response);
      const Icharacters = [];

      response.characters.map(item => {
        Icharacters.push(
          item.replace('https://rickandmortyapi.com/api/character/', ''),
        );
      });

      const characterResponse = await (
        await fetch(
          'https://rickandmortyapi.com/api/character/' + Icharacters.toString(),
        )
      ).json();
      setCharacters(characterResponse);
    };
    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Background,
      }}>
      <View style={styles.view}>
        <View style={styles.header}>
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

          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../assets/images/rickandmorty.png')}
          />
        </View>
        <View>
          <View style={styles.episodeContainer}>
            <Text style={styles.episodeName}>{episode?.name}</Text>

            <Text style={styles.episodeDetail}>
              Season and Episode:
              {episode?.episode}
            </Text>

            <Text style={styles.episodeDetail}>
              Release Date:
              {episode?.air_date}
            </Text>
          </View>
          <Text style={styles.charText}>
            Characters:
            {episode?.characters?.length}
          </Text>
        </View>

        <FlatList
          style={{
            width: '100%',
          }}
          keyExtractor={item => item.id}
          data={characters}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.charBox}
                onPress={() => {
                  navigation.push('Character', {id: item.id});
                }}>
                <Image style={styles.charImg} source={{uri: item.image}} />
                <View style={styles.row}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <View style={styles.line} />
                  <Text style={styles.text}>{item.status}</Text>
                  <Text style={styles.text}>{item.species}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  img: {
    width: '100%',
    height: hp(10),
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  charText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(3),
    color: FontColor,
    textAlign: 'center',
  },
  episodeContainer: {
    justifyContent: 'center',
    backgroundColor: '#219ebc',
    borderRadius: wp(2),
    marginTop: hp(4),
    padding: hp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  episodeName: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(4),
    color: '#fff',
    textAlign: 'center',
  },
  episodeDetail: {
    fontFamily: 'RobotoMono-SemiBold',
    fontSize: hp(2),
    color: '#fff',
  },
  charBox: {
    marginVertical: hp(1),
    backgroundColor: Container,
    borderColor: '#DEDEDE',
    borderWidth: hp('0.1'),
    borderRadius: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  charImg: {
    borderTopLeftRadius: hp(1),
    borderBottomLeftRadius: hp(1),
    width: wp(20),
    height: wp(20),
  },
  line: {
    height: hp('0.1'),
    backgroundColor: FontColor,
    width: '75%',
    marginBottom: hp(1),
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    color: FontColor,
  },
  nameText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: FontColor,
    fontFamily: 'RobotoMono-Regular',
    fontSize: wp(5),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default EpisodeDetail;
