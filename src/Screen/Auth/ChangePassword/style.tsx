import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
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
    marginTop: '10%',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: 'black',
  },
  detailText: {
    fontFamily: 'WorkSans-Regular',
    color: 'black',
    textAlign: 'center',
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
    width: 60,
    height: 60,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#CF9F16',
    borderRadius: 30,

    textAlign: 'center',
    backgroundColor: 'white',
  },
  focusCell: {
    borderColor: '#000',
  },
  errors: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 18,
  },
  okPic: {
    width: 300,
    height: 300,
  },
  midView: {width: '90%', marginTop: '40%', alignSelf: 'center'},
  resend: {marginTop: 10, alignItems: 'flex-end'},
  resendText: {
    color: '#46A4DF',
    fontFamily: 'MerriweatherSans-Bold',
  },
  bottomView: {
    marginTop: '40%',
    marginBottom: 20,
  },
  email: {
    fontFamily: 'WorkSans-SemiBold',
    color: '#46A4DF',
  },
  passwordImage: {width: 30, bottom: 3, height: 30},
  secureEye: {
    width: 25,
    bottom: 0,
    height: 25,
  },
});

export default styles;
