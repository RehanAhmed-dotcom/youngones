import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';

const FrequentRender = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ServideDetails', {item})}
      style={styles.renderItem}>
      <Image
        source={{uri: item.service_image}}
        // resizeMode="contain"
        style={styles.image}
      />
      <View
        style={{alignItems: 'center', justifyContent: 'center', height: 70}}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            bottom: 13,
            fontFamily: 'WorkSans-Regular',
            textAlign: 'center',
          }}>
          {item.serviceName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FrequentRender;
