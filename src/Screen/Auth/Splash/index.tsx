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
      navigation.navigate('IntroVideo');
    }, 3000);
  });
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: '#4D00DE',
      }}>
      <ImageBackground
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        source={require('../../../Assets/Images/BackGround.png')}>
        <Image
          source={require('../../../Assets/Images/Logo.png')}
          style={{
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}
        />
        <Text style={{color: 'white', fontSize: 25, fontFamily: 'ArialMdm'}}>
          Job Finder
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Splash;
