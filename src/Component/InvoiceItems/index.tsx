import React from 'react';
import {Text, View} from 'react-native';

const InvoiceItems = ({first, second, showBorder}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        paddingTop: 10,
        backgroundColor: '#2D2D35',
        borderBottomColor: '#505050',
        borderBottomWidth: showBorder ? 1 : 0,
        paddingBottom: 10,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontFamily: 'ArialCE',
        }}>
        {first}
      </Text>
      <Text
        style={{
          color: '#FFBD00',
          fontSize: 14,
          fontFamily: 'ArialMdm',
        }}>
        {second}
      </Text>
    </View>
  );
};

export default InvoiceItems;
