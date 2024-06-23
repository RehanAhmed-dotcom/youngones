import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainView: {
    flex: 1,

    backgroundColor: 'black',
  },
  middle: {
    // backgroundColor: 'red',
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  topView: {
    marginTop: heightPercentageToDP(10),
    backgroundColor: '#E7F3F9',
    padding: 10,
  },
  row: {marginTop: 20, flexDirection: 'row', alignItems: 'center'},
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  oneBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '48%',
    borderRadius: 5,
  },
  oneLine: {
    height: 50,
    backgroundColor: '#E7F3F9',
    borderTopColor: '#ccc',
    justifyContent: 'center',
    paddingLeft: 10,
    borderTopWidth: 1,
  },
  round: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#E7F3F9',

    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F8BC2',
    height: 58,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    // backgroundColor: 'red',
    // borderWidth: 1,
    // borderColor: '#ccc',
    color: 'white',
    fontFamily: 'WorkSans-Regular',
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    width: '90%',
  },
});
export default styles;
