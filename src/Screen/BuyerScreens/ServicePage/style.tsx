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

    backgroundColor: 'white',
  },
  middle: {
    // backgroundColor: 'red',
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    paddingTop: 20,
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
  serviceStyle: {
    flexDirection: 'row',
  },
});
export default styles;
