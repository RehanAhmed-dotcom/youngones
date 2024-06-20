import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
interface loaderProp {
  show: boolean;
  navigationFunc?: () => void;
  hideModal?: () => void;
}
import CrossIcon from 'react-native-vector-icons/Entypo';
const ApproveModal: React.FC<loaderProp> = ({
  show,
  hideModal,
  navigationFunc,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <TouchableOpacity
        onPress={() => hideModal()}
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            // height: 200,
            width: '90%',
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}>
          {/* <CrossIcon
            name="cross"
            size={40}
            style={{marginTop: 40}}
            color={'red'}
          /> */}
          {/* <Text
            style={{
              fontSize: 16,
              fontFamily: 'WorkSans-Medium',
              color: 'black',
              marginTop: 30,
            }}>
            You don't have an account
          </Text> */}

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'WorkSans-Regular',
              color: 'black',
              marginTop: 20,
            }}>
            First check and make sure that your work is complete and if the work
            is complete then make the payment first. After payment you are able
            to approve the completed request.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => hideModal()}
              style={{
                backgroundColor: '#DBE4E6',
                height: 50,
                borderRadius: 10,
                width: '45%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black', fontFamily: 'WorkSans-Medium'}}>
                Cancel
              </Text>
            </TouchableOpacity>
            {/* 
            <TouchableOpacity
              onPress={() => navigationFunc()}
              style={{
                backgroundColor: '#0F8BC2',
                height: 50,
                width: '45%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontFamily: 'WorkSans-Medium'}}>
                SignUp
              </Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
        {/* <View
          style={{
            height: 50,
            width: 50,
            // backgroundColor:"red",
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <ActivityIndicator size="small" color={'#0F8BC2'} />
        </View> */}
      </TouchableOpacity>
    </Modal>
  );
};

export default ApproveModal;
