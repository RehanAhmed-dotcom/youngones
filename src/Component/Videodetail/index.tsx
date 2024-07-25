import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, Platform} from 'react-native';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';

import Icons from 'react-native-vector-icons/Foundation';

const Videodetail = props => {
  const [paused, setPaused] = useState(true);

  return (
    // <Text>abc</Text>
    <>
      <Image
        source={require('../../Assets/Images/Thumb.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          height: 250,
          right: 0,
          width: '100%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          props.touch();
          setPaused(true);
        }}
        style={{
          position: 'absolute',
          height: props.modal
            ? props.data.summary
              ? '80%'
              : '95%'
            : props.data.summary
            ? 175
            : 225,
          // backgroundColor: 'red',
          zIndex: 20,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* {paused ? (
          <Icon4
            name={'controller-play'}
            // onPress={() => setPaused(!paused)}
            size={40}
            color="white"
          />
        ) : (
          <Icon
            name={'pause'}
            // onPress={() => setPaused(!paused)}
            size={40}
            color="white"
          />
        )} */}
      </TouchableOpacity>
      {/* <TouchableOpacity
        // onPress={() => muteAudio()(dispatch)}
        style={{
          backgroundColor: 'black',
          borderRadius: 20,
          position: 'absolute',
          height: 30,
          width: 30,
          // top: 20,
          bottom: props.data.summary ? 55 : -45,
          alignItems: 'center',
          justifyContent: 'center',
          right: 20,
          zIndex: 200,
          // marginTop: 250,
        }}>
        <Icons name={'volume'} color={'white'} size={20} />
      </TouchableOpacity> */}
      {/* {props.data.summary ? ( */}

      {/* ) : null} */}
    </>
  );
};
export default Videodetail;
