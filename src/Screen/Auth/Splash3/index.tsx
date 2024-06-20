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

const Splash3 = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
      }}>
      <Image
        source={require('../../../Assets/Images/onBoardingImages2.png')}
        style={{width: 250, height: 250}}
        resizeMode="contain"
      />
      <Text
        numberOfLines={3}
        style={{width: 200, textAlign: 'center', lineHeight: 30}}>
        Find a job you enjoy doing, and you will never have to work a day in
        your life
      </Text>
      <View style={{width: '90%'}}>
        <FillButton
          Name="Next"
          customColor="black"
          customTextColor="white"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default Splash3;
