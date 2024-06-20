import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFECEA',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  empty: {
    width: 50,
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
    // fontWeight: 'bold',
    // font
  },
  bold: {
    // fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
  },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    // zIndex: -1,
    justifyContent: 'space-between',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'white',
  },
  second: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  img: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    // zIndex: -1,
    borderRadius: 75,
    backgroundColor: 'white',
  },
  showImg: {
    height: '100%',
    width: '100%',
    borderRadius: 75,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    backgroundColor: '#FFECEA',
    height: 50,
    // alignItems: 'center',
    elevation: 4,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  details: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFECEA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginTop: 20,
  },
  texts: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
  },
  logout: {
    width: 50,
    height: 50,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    alignItems: 'center',
  },
  flat: {marginTop: 20},
  flatImg: {
    height: 100,
    width: 100,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  bottom: {
    marginBottom: 10,
  },
});
export default styles;
