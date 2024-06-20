import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Splash1');
    }, 1000);
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
      }}>
      <Image
        source={require('../../../Assets/Images/Logo.png')}
        style={{width: 200, height: 200}}
      />
    </View>
  );
};

export default Splash;
