import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FillButton from '../../../Component/FillButton';

const Splash2 = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#2D2D35',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
      }}>
      <Image
        source={require('../../../Assets/Images/onBoardingImages1.png')}
        style={{width: 250, height: 250}}
        resizeMode="contain"
      />
      <Text
        numberOfLines={3}
        style={{
          width: 250,
          textAlign: 'center',
          color: 'white',
          lineHeight: 30,
          fontFamily: 'arial',

          fontSize: 16,
        }}>
        The harder you work for something, the greater you'll feel when you
        achieve it
      </Text>
      <View style={{width: '90%'}}>
        <FillButton
          Name="Next"
          customColor="#2D2D35"
          customTextColor="white"
          onPress={() => navigation.navigate('Splash3')}
        />
      </View>
    </View>
  );
};

export default Splash2;
