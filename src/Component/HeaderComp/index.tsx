import React from 'react';
import {Text, Platform, View, ImageBackground} from 'react-native';
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
  backGround?: boolean;
}
const HeaderComp: React.FC<headerProps> = ({
  label,
  navigation,
  leftIcon,
  rightIcon,
  backGround,
  mid,
}) => {
  const WrapperComp = backGround ? ImageBackground : View;
  return (
    <WrapperComp
      source={require('../../Assets/Images/gradient1.png')}
      style={{
        height: 58,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 10,
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
          fontFamily: 'ArialMdm',
          // fontWeight: 'bold',
        }}>
        {label ? label : mid}
      </Text>
      {rightIcon ? rightIcon : <View style={{width: 30}} />}
    </WrapperComp>
  );
};

export default HeaderComp;
