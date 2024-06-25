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

const Splash1 = ({navigation}) => {
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
        numberOfLines={2}
        style={{
          width: 250,
          color: 'white',

          textAlign: 'center',
          lineHeight: 30,
          fontFamily: 'arial',

          fontSize: 16,
        }}>
        Opportunities don't happen. You create them.
      </Text>
      <View style={{width: '90%'}}>
        <FillButton
          Name="Next"
          customColor="black"
          customTextColor="white"
          onPress={() => navigation.navigate('Splash2')}
        />
      </View>
    </View>
  );
};

export default Splash1;
