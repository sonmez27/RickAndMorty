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
import {Background, FontColor, Container} from '../utils/Color';

const Episodes = ({navigation}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/episode');

  const getData = async () => {
    const response = await (await fetch(url)).json();
    setUrl(response.info.next);
    setData([...data, ...response.results]);
  };

  useEffect(() => {
    setError('');
    getData().catch(err => {
      console.log('err', err);
      setError('Something went wrong!');
    });
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <Image
        resizeMode="contain"
        style={styles.img}
        source={require('../assets/images/rickandmorty.png')}
      />
      {error ? (
        <Text style={styles.err}>{error}</Text>
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          onEndReached={() => {
            if (url) {
              getData();
            }
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('EpisodeDetail', {id: item.id});
                }}
                style={styles.container}>
                <Text style={styles.name}>
                  Episode Name:
                  {item.name}
                </Text>
                <View style={styles.line} />
                <Text style={styles.text}>
                  Season and Episode:
                  {item.episode}
                </Text>
                <Text style={styles.text}>
                  Characters:
                  {item.characters.length}
                </Text>
                <Text style={styles.text}>
                  Release Date:
                  {item.air_date}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  img: {
    width: '100%',
    height: hp(20),
  },
  err: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(2),
    color: FontColor,
  },
  container: {
    margin: hp(1),
    padding: wp(3),
    borderColor: '#DEDEDE',
    borderWidth: hp('0.1'),
    borderRadius: hp(1),
    backgroundColor: Container,
    shadowColor: FontColor,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontFamily: 'RobotoMono-SemiBold',
    fontSize: hp(2),
    color: FontColor,
  },
  line: {
    height: hp('0.1'),
    backgroundColor: FontColor,
    width: '95%',
    marginBottom: hp(1),
  },
  text: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: hp(2),
    color: FontColor,
  },
});
export default Episodes;
