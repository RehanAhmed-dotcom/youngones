import React, {useRef} from 'react';
import {ActivityIndicator, Image, Modal, View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
interface loaderProp {
  show: boolean;
}
const Loader: React.FC<loaderProp> = ({show}) => {
  //   console.log('show', show);
  const videoRef = useRef<VideoRef>(null);
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <View
          style={{
            height: 120,
            width: 120,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          <Video
            repeat
            ref={videoRef}
            source={require('../../Assets/Images/job_finder_1.mp4')}
            // style={{
            //   position: 'absolute',
            //   top: 0,
            //   left: 0,
            //   bottom: 0,
            //   right: 0,
            // }}
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* <Image
            source={require('../../Assets/Images/job_finder.gif')}
            style={{width: 60, borderRadius: 30, height: 60}}
          /> */}
      {/* <ActivityIndicator size="small" color={'#2D2D35'} /> */}
    </Modal>
  );
};

export default Loader;
