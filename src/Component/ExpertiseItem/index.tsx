import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const ExpertiseItem = ({item, onPress}) => {
  const [check, setCheck] = useState(false);
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: '#373A43',
        marginBottom: 30,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#FAFAFA',
        // shadowColor: '#000', // Shadow color
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        paddingHorizontal: 20,
        // justifyContent: 'center',
      }}
      onPress={() => {
        setCheck(!check);
        onPress();
      }}>
      <CheckIcon
        name={!check ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={20}
        color={check ? '#FFBD00' : 'white'}
      />
      <Text style={{color: 'white', fontFamily: 'ArialMdm', marginLeft: 10}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ExpertiseItem;
