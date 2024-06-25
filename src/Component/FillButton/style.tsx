import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: '#46A4DF',
    height: 50,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFBD00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',

    // fontWeight: 'bold',

    fontFamily: 'Arial-Bold',
    fontSize: 16,
  },
});
export default styles;
