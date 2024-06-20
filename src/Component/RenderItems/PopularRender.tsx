import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';

const PopularRender = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ServicePage', {text: item.name, id: item.id})
      }
      style={styles.renderItem}>
      <Image
        source={{uri: item.icon}}
        resizeMode="contain"
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
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularRender;
