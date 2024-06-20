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
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    color: 'white',
    // borderWidth: 1,
    backgroundColor: '#373A43',
    // borderColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  mainInputView: {
    width: '100%',
    marginTop: 5,
  },

  inputView: {
    width: '90%',
    height: 60,
    paddingHorizontal: 10,
    color: 'white',
    fontFamily: 'WorkSans-Regular',
    // backgroundColor: 'red',
  },
  name: {
    color: 'white',
    fontFamily: 'MerriweatherSans-Bold',
    fontSize: 16,
  },
});
export default styles;
