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
import Icon from 'react-native-vector-icons/AntDesign';
const Splash1 = ({navigation}) => {
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
        <View
          style={{
            // backgroundColor: 'red',
            width: '100%',
            // height: 50,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              // setPaused(true);
              navigation.navigate('Splash2');
            }}
            style={{
              height: 60,
              borderRadius: 30,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#FFBD00',
            }}>
            <Icon name="right" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        {/* <FillButton
          Name="Next"
          customColor="#2D2D35"
          customTextColor="white"
          onPress={() => navigation.navigate('Splash2')}
        /> */}
      </View>
    </View>
  );
};

export default Splash1;
