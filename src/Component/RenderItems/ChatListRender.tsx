import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {senderMsg} from '../../lib/MessageUtil';
import moment from 'moment';

const ChatListRender = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        const userItem = {
          username: item?.user.username,
          email: item?.user.email,
          image: item?.user.image,
          id: item?.user.id,
        };
        navigation.navigate('MessageScreen', {
          item: userItem,
        });
      }}
      style={styles.chatItem1}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            item.user.image
              ? {uri: item?.user?.image}
              : require('../../Assets/Images/girl.jpeg')
          }
          style={[styles.image, {width: 40, height: 40, borderRadius: 30}]}
        />
        <View style={{marginLeft: 10, width: '60%'}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Medium',
              fontSize: 14,
            }}>
            {item?.user?.username}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Regular',
              marginTop: 0,
              fontSize: 14,
            }}>
            {item.latestMessage}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'WorkSans-Regular',
            fontSize: 12,
          }}>
          {moment(item.timestamp).format('hh:mm a')}
        </Text>
        {item.counter ? (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#0F8BC2',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontFamily: 'WorkSans-Regular',
                fontSize: 12,
              }}>
              {item.counter}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListRender;
