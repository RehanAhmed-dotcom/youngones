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
        backgroundColor: 'black',
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
        <FillButton
          Name="Next"
          customColor="black"
          customTextColor="white"
          onPress={() => {
            setPaused(true);
            navigation.navigate('Splash1');
          }}
        />
      </View>
    </View>
  );
};

export default IntroVideo;
