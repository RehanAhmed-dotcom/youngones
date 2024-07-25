import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ImgComp = props => {
  const {items} = props;

  return (
    <>
      <Image
        source={{uri: items.image}}
        style={{
          height: 250,
          //   height: '100%',
          width: '100%',
          resizeMode: 'cover',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
    </>
  );
};
export default ImgComp;
