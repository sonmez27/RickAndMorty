import {Appearance} from 'react-native';

const colorScheme = Appearance.getColorScheme();
//const colorScheme = 'dark';
const Background = colorScheme === 'dark' ? '#1D3557' : '#F1FAEE';
const FontColor = colorScheme === 'dark' ? '#F1FAEE' : '#1D3557';
const Container = colorScheme === 'dark' ? '#457B9D' : '#A8DADC';

module.exports = {
  Background,
  FontColor,
  Container,
};
