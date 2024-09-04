import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import CrossIcon from 'react-native-vector-icons/Entypo';

interface loaderProp {
  imgshow: boolean;
  image: string;
  hideModal: () => void;
}
const OnlyImageModal: React.FC<loaderProp> = ({imgshow, hideModal, image}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={imgshow}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        hideModal();
      }}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}
            style={{
              height: 30,
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CrossIcon color={'white'} size={25} name="squared-cross" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '85%',
            width: '100%',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',
            // borderRadius: 25,
          }}>
          <Image
            source={{uri: image}}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
          {/* <ActivityIndicator size="small" color="black" /> */}
        </View>
      </View>
    </Modal>
  );
};

export default OnlyImageModal;
