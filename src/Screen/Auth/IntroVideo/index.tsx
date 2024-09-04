import React, {useEffect, useRef, useState} from 'react';
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
// import Video, {VideoRef} from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
const IntroVideo = ({navigation}) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const background = require('../../../Assets/Images/Video.mp4');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPaused(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#2D2D35',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
      }}>
      <View style={{width: '90%'}}>
        <View style={{height: heightPercentageToDP(80)}}>
          <Video
            // Can be a URL or a local file.
            source={background}
            // Store reference
            ref={videoRef}
            paused={paused}
            // Callback when remote video is buffering
            // onBuffer={onBuffer}
            // // Callback when video cannot be loaded
            // onError={onError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            width: '100%',
            // height: 50,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setPaused(true);
              navigation.navigate('Splash1');
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
          icon={<Icon name="right" size={20} color={'white'} />}
          customTextColor="white"
          onPress={() => {
            setPaused(true);
            navigation.navigate('Splash1');
          }}
        /> */}
      </View>
    </View>
  );
};

export default IntroVideo;
