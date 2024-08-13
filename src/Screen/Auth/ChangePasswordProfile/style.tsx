import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  contantView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: '1%',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  imageView: {
    width: '100%',
    height: '100%',
    flex: 1,
    // paddingVertical: 30,
    marginTop: 20,
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 18,
    fontFamily: 'MerriweatherSans-Bold',
    color: 'white',
  },
  detailText: {
    fontFamily: 'WorkSans-Regular',
    color: 'black',
    marginTop: 10,
  },
  bigButtons: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 100,
    paddingLeft: 5,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 50,
  },
  picture: {
    height: 90,
    width: 90,
  },
  nameText: {
    color: '#4F3422',
    fontFamily: 'MerriweatherSans-Bold',
    fontSize: 16,
    marginLeft: 10,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    // borderWidth: 2,
    borderColor: '#CF9F16',
    borderRadius: 10,

    textAlign: 'center',
    backgroundColor: '#373A43',
  },
  focusCell: {
    borderColor: '#000',
  },
  okPic: {
    width: 300,
    height: 300,
  },
  errors: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 18,
  },
  midView: {
    width: '90%',
    // backgroundColor: 'red',
    marginTop: '10%',
    alignSelf: 'center',
  },
  resend: {marginTop: 10, alignItems: 'flex-end'},
  resendText: {
    color: '#46A4DF',
    fontFamily: 'MerriweatherSans-Bold',
  },
  bottomView: {
    marginTop: heightPercentageToDP(25),
    marginBottom: 20,
  },
  passwordImage: {width: 30, bottom: 3, height: 30},
});

export default styles;
