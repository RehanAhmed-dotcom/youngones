import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import CheckIcon from 'react-native-vector-icons/AntDesign';
const InterestItem = ({item}) => {
  const [check, setCheck] = useState(false);
  return (
    <TouchableOpacity
      style={{
        // width: '100%',
        backgroundColor: '#373A43',
        marginBottom: 30,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 20,
        // justifyContent: 'center',
      }}
      onPress={() => setCheck(!check)}>
      {/* <CheckIcon
        name={!check ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={20}
      /> */}
      <Text style={{color: 'white', fontFamily: 'ArialMdm', marginLeft: 10}}>
        {item}
      </Text>
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
    </TouchableOpacity>
  );
};

export default InterestItem;
