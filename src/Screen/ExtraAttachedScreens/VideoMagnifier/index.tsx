import React, {useState, useEffect} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Foundation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
const VideoMagnifier = ({navigation, route}) => {
  const {videoLink, summary, poster} = route.params;
  const [paused, setPaused] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}></View>
      <View style={{height: '100%', justifyContent: 'center', width: '100%'}}>
        <>
          <Video
            source={{
              uri: videoLink,
            }}
            // progressUpdateInterval={1000}
            resizeMode="contain"
            posterresizeMode="cover"
            ignoreSilentSwitch={'ignore'}
            repeat={Platform.OS == 'ios' ? true : false}
            onEnd={() => setPaused(true)}
            onError={err => console.log('error in video', err)}
            // muted={muteaudio}
            // onEnd={() => setPaused(!paused)}
            onLoad={() => {
              console.log('loaded');
              setShow(true);
            }}
            poster={poster}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: wp(100),
              // back
              // borderRadius: 10,
              borderRadius: 10,
              bottom: 0,
              height: hp(100),
              right: 0,
            }}
            // controls={true}
            paused={paused}
          />
          <TouchableOpacity
            // onPress={() => setRefresh(!refresh)}
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'black',
              borderRadius: 20,
              position: 'absolute',
              height: 50,
              width: 50,
              top: 40,

              alignItems: 'center',
              justifyContent: 'center',
              left: 20,
              zIndex: 200,
              // marginTop: 250,
            }}>
            <Icon
              name={'arrowleft'}
              // onPress={() => navigation.goBack()}
              color={'white'}
              style={{zIndex: -200}}
              size={20}
            />
          </TouchableOpacity>

          {show ? (
            <TouchableOpacity
              onPress={() => {
                setPaused(!paused);
                // props.open();
                // navigation.navigate('PostDetails', {id: props.id});
              }}
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                // backgroundColor: 'red',

                justifyContent: 'center',
              }}></TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </>
      </View>
    </View>
  );
};
export default VideoMagnifier;
