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
    fontFamily: 'ArialMdm',
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
    elevation: 1,
    shadowColor: '#FAFAFA',
    // shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
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
    fontFamily: 'ArialCE',
    // backgroundColor: 'red',
  },
  name: {
    color: 'white',
    fontFamily: 'MerriweatherSans-Bold',
    fontSize: 16,
  },
});
export default styles;
