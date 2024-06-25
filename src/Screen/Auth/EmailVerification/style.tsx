import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,

    backgroundColor: 'black',
  },
  imageView: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingVertical: 30,
    // backgroundColor: 'blue',
    // alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 47,
    fontSize: 20,
    backgroundColor: '#373A43',
    color: 'white',
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    fontFamily: 'ArialMdm',
    // borderWidth: 2,
    // borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  contextView: {
    width: '95%',
    alignSelf: 'center',
    // height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: hp(20),
    // backgroundColor: 'red',
  },
  signIn: {
    color: '#BDBDBD',
    fontSize: 14,
    // fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'ArialCE',
  },
  loginContainer: {
    // marginTop: hp(15),
    // backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
  },

  passwordImage: {width: 20, bottom: 3, height: 20},
  twofaceView: {
    width: '20%',
    height: '20%',
    backgroundColor: 'black',
  },
  errors: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'WorkSans-Medium',
    // fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 18,
  },
  boldLastText: {
    color: 'grey',
    marginTop: 20,
    textAlign: 'center',

    fontFamily: 'WorkSans-Regular',
  },
  forgotText: {
    color: 'white',
    marginBottom: 5,
    fontFamily: 'MerriweatherSans-Regular',
  },
  twoface: {
    width: '35%',
    height: '35%',
    alignSelf: 'center',
    bottom: 50,
  },
  mainInputView: {
    width: '100%',
    marginTop: hp(5),
  },
  signInButton: {
    marginTop: 30,
    width: '100%',
  },
  bold: {
    color: '#FFBD00',
    // fontWeight: 'bold',
    fontFamily: 'WorkSans-SemiBold',
  },
  secureEye: {
    width: 20,
    bottom: 0,
    height: 20,
  },
  nameText: {
    color: 'grey',
    alignSelf: 'center',
    fontFamily: 'WorkSans-Regular',

    marginTop: 15,
  },

  forgotView: {
    // marginTop: hp(20),
    width: '100%',
  },
  welcomeText: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'MerriweatherSans-ExtraBold',
  },
  normalText: {
    alignSelf: 'center',
    fontFamily: 'MerriweatherSans-Regular',
    marginTop: 5,
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  bottomButtonView: {
    marginTop: hp(10),
  },
  buttonText: {
    color: 'white',
    fontFamily: 'MerriweatherSans-Bold',
  },
});
export default styles;
