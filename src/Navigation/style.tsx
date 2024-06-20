import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    // backgroundColor: 'red',
    paddingHorizontal: 15,
  },
  midText: {
    // fontFamily: 'MerriweatherSans-Bold',
    fontSize: 16,
    color: '#4F3422',
  },
  homeimage: {
    width: 20,
    height: 20,
    borderRadius: 30,
  },
  text: {
    fontSize: 12,
    // fontFamily: 'MerriweatherSans-Bold',
  },
});
export default styles;
