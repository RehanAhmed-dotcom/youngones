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
  mainView: {
    flex: 1,

    backgroundColor: '#2D2D35',
  },
  middle: {
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#B5DBEC',
    alignItems: 'center',
    paddingHorizontal: 10,

    // justifyContent: 'space-between',
    borderRadius: 10,
    height: 50,
    width: '100%',
    marginTop: 20,
  },
  inputView: {
    // backgroundColor: 'red',
    width: '85%',
  },
  equalizerView: {
    transform: [{rotate: '90deg'}],
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popularView: {
    marginTop: 30,
  },
  popular: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  innerView: {
    backgroundColor: '#ECEEEE',
    padding: 10,
  },
  share: {
    backgroundColor: '#E7F3F9',
    padding: 10,
    marginBottom: 20,
  },
});
export default styles;
