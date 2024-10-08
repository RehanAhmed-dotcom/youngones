import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import CheckIcon from 'react-native-vector-icons/AntDesign';
const InterestItem = ({item, onPress}) => {
  const [check, setCheck] = useState(false);
  return (
    <TouchableOpacity
      style={{
        // width: '100%',
        backgroundColor: '#373A43',
        marginBottom: 30,
        height: 50,
        flexDirection: 'row',
        elevation: 1,
        shadowColor: '#FAFAFA',
        // shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 20,
        // justifyContent: 'center',
      }}
      onPress={() => {
        setCheck(!check);
        onPress();
      }}>
      {/* <CheckIcon
        name={!check ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={20}
      /> */}
      <Text style={{color: 'white', fontFamily: 'ArialMdm', marginLeft: 10}}>
        {item.name}
      </Text>
      {check && (
        <View
          style={{
            height: 20,
            width: 20,
            marginLeft: 10,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#876E28',
          }}>
          <CheckIcon name={'check'} size={10} color={'#FFBD00'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default InterestItem;
