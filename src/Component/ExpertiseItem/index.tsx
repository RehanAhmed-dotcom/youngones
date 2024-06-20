import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const ExpertiseItem = ({item}) => {
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
        paddingHorizontal: 20,
        // justifyContent: 'center',
      }}
      onPress={() => setCheck(!check)}>
      <CheckIcon
        name={!check ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={20}
      />
      <Text style={{color: 'white', marginLeft: 10}}>{item}</Text>
    </TouchableOpacity>
  );
};

export default ExpertiseItem;
