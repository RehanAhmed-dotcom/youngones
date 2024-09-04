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
    width: '90%',
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

    justifyContent: 'space-between',
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
  renderItem: {
    width: 85,
    height: 110,
    marginRight: 5,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ECEEEE',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  ServicerenderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 10,
    // overflow: 'hidden',
  },
  priceView: {
    backgroundColor: '#0F8BC2',
    marginTop: 10,
    borderRadius: 30,
    padding: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },

  nextView: {
    width: '55%',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  imageView: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  chatItem: {
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingBottom: 10,
    // flexDirection: 'row',
    marginBottom: 20,
    // justifyContent: 'space-between',
  },
  requestRender: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#E7F3F9',
    marginBottom: 20,
  },
  renderRow: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
  },
  acceptView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  accept: {
    backgroundColor: '#0F8BC2',
    borderRadius: 10,
    marginRight: 20,
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  chatItem1: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // backgroundColor: 'red',
    // border
    borderBottomColor: '#C6C7CA',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    flexDirection: 'row',
    marginTop: 20,
    // marginBottom: 20,

    justifyContent: 'space-between',
  },
  serviceStyle: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    elevation: 3,
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  imageList: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  secondView: {
    marginLeft: 20,
  },
  nameText: {
    fontFamily: 'WorkSans-SemiBold',
    color: 'black',
  },
  secondText: {
    marginTop: 10,
    fontFamily: 'WorkSans-Regular',
    color: 'black',
  },
  connectButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#0F8BC2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
