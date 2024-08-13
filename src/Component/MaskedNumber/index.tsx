import React from 'react';
import {Text, View} from 'react-native';

const MaskedNumber = ({number}) => {
  const maskNumber = num => {
    const strNum = num.toString();
    if (strNum.length <= 2) return strNum;
    return '*'.repeat(strNum.length - 2) + strNum.slice(-3);
  };

  return (
    <Text style={{color: 'white', fontFamily: 'ArialCE', marginTop: 5}}>
      {maskNumber(number)}
    </Text>
  );
};

export default MaskedNumber;
