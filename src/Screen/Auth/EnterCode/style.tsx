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
    marginTop: '10%',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
    color: 'black',
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
    width: 60,
    height: 60,
    lineHeight: 60,
    fontSize: 24,

    borderWidth: 1,
    borderColor: '#B5DBEC',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  focusCell: {
    borderColor: '#46A4DF',
  },
  okPic: {
    width: 300,
    height: 300,
  },
  midView: {width: '90%', marginTop: '20%', alignSelf: 'center'},
  resend: {marginTop: 10, alignItems: 'flex-end'},
  resendText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'WorkSans-SemiBold',
  },
  bottomView: {
    marginTop: heightPercentageToDP(40),
    marginBottom: 20,
  },
  email: {
    fontFamily: 'WorkSans-SemiBold',
    color: 'black',
  },
});

export default styles;
