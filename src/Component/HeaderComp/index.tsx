import React from 'react';
import {Text, Platform, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
// import ArrowLeft from 'react-native-vector-icons/AntDesign';
// import BellIcon from 'react-native-vector-icons/FontAwesome';
// import {useSelector} from 'react-redux';
interface headerProps {
  label: string;
  navigation?: any;
  leftIcon?: React.Component;
  rightIcon?: React.Component;
  mid?: React.Component;
}
const HeaderComp: React.FC<headerProps> = ({
  label,
  navigation,
  leftIcon,
  rightIcon,
  mid,
}) => {
  return (
    <View
      style={{
        height: 58,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 4,
        backgroundColor: 'black',
        width: widthPercentageToDP(100),
        bottom: -0,
        shadowColor: '#FAFAFA',
        // shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        alignItems: 'center',

        justifyContent: 'space-between',
      }}>
      {leftIcon ? leftIcon : <View style={{width: 30}} />}
      <Text
        style={{
          color: 'white',
          marginLeft: 10,
          fontSize: 16,
          fontFamily: 'WorkSans-Medium',
          // fontWeight: 'bold',
        }}>
        {label ? label : mid}
      </Text>
      {rightIcon ? rightIcon : <View style={{width: 30}} />}
    </View>
  );
};

export default HeaderComp;
