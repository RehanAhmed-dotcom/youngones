// import React from 'react';
// import {FlatList, Platform, TouchableOpacity, View} from 'react-native';
// import styles from './style';
// import HeaderComp from '../../../Component/HeaderComp';
// import ArrowBack from 'react-native-vector-icons/AntDesign';
// const MessageScreen = ({navigation}) => {
//   const data = [1, 2, 3, 4, 5, 6, 7, 8];
//   return (
//     <View
//       style={[styles.mainView, ]}>
//      <HeaderComp
//             leftIcon={
//               <ArrowBack
//                 name="left"
//                 onPress={() => navigation.goBack()}
//                 size={20}
//                 color={'white'}
//               />
//             }
//             label="Submit Document"
//           />
//       {/* <Wrapper behavior="padding" style={{flex: 1}}> */}
//         <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
//           <FlatList data={data} inverted renderItem={renderItem} />
//         </View>
//         <View
//           style={{
//             // flexDirection: 'row',
//             // alignItems: 'center',
//             // justifyContent: 'space-between',
//             backgroundColor: 'white',
//             paddingBottom: 20,
//             paddingHorizontal: 15,

//             paddingTop: 10,
//           }}>
//           {image && (
//             <View>
//               <Image
//                 source={{uri: image}}
//                 style={{
//                   width: 100,
//                   height: 100,
//                   marginLeft: 40,
//                   marginBottom: 10,
//                 }}
//               />
//             </View>
//           )}
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               width: '100%',
//             }}>
//             <Arrowleft
//               name="camerao"
//               onPress={() => imagePick()}
//               size={20}
//               color={'black'}
//             />
//             <TextInput
//               placeholder="Type Message"
//               placeholderTextColor={'grey'}
//               style={styles.input}
//               value={message}
//               onChangeText={text => setMessage(text)}
//             />
//             <SendIcon
//               name="send"
//               size={20}
//               color={'black'}
//               onPress={() => handleSend()}
//             />
//           </View>
//         </View>
//       {/* </Wrapper> */}
//     </View>
//   );
// };

// export default MessageScreen;
// const renderItem = ({item, index}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => console.log('item', item)}
//         style={{
//           backgroundColor:
//             item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
//               ? '#0F8BC2'
//               : 'white',
//           maxWidth: 250,
//           padding: 10,
//           borderRadius: 10,
//           marginBottom: index == 0 ? 10 : 0,
//           marginTop: 10,
//           alignSelf:
//             item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
//               ? 'flex-end'
//               : 'flex-start',
//           borderBottomRightRadius:
//             item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '') ? 0 : 10,
//           borderBottomLeftRadius:
//             item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '') ? 10 : 0,
//         }}>
//         {item.image && (
//           <Image
//             source={{uri: item.image}}
//             resizeMode="cover"
//             style={{height: 100, width: 200}}
//           />
//         )}
//         <Text
//           style={{
//             color:
//               item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
//                 ? 'white'
//                 : 'black',
//             fontFamily: 'WorkSans-Regular',
//             lineHeight: 25,
//           }}>
//           {item.msg}
//         </Text>
//         <View>
//           <Text
//             style={{
//               color:
//                 item.sendBy == user?.email.replace(/[^a-zA-Z0-9 ]/g, '')
//                   ? 'white'
//                   : 'black',
//               fontSize: 10,
//               marginTop: 5,
//               fontFamily: 'WorkSans-Regular',
//               textAlign: 'right',
//             }}>
//             {moment(item.date).format('hh:MM a')}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import database from '@react-native-firebase/database';
import styles from './style';
import ArrowBack from 'react-native-vector-icons/AntDesign';
import ImageCropPicker from 'react-native-image-crop-picker';
import HeaderComp from '../../../Component/HeaderComp';
import Arrowleft from 'react-native-vector-icons/AntDesign';
import SendIcon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {useSelector} from 'react-redux';
import {recieverMsg, senderMsg} from '../../../lib/MessageUtil';
import {FlatList} from 'react-native';
// import moment from 'moment';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
const MessageScreen = ({navigation}) => {
  // const {user} = useSelector(state => state.user);
  // const item = route?.params?.item;
  // console.log('item', item);
  // const [message,setMessage] = useState('');
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const {top, bottom} = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [messages, setMessages] = useState([1, 2, 4, 5, 6, 7, 8]);
  console.log('mess', messages);

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => console.log('item', item)}
          style={{
            backgroundColor: item == 1 ? '#FBBC05' : '#373A43',
            maxWidth: 350,
            // padding: 10,
            paddingVertical: 5,
            borderRadius: 30,
            paddingHorizontal: 30,
            // marginBottom: index == 0 ? 10 : 0,
            marginTop: 10,
            alignSelf: item == 1 ? 'flex-start' : 'flex-end',
            borderTopLeftRadius: item == 1 ? 0 : 30,
            borderBottomRightRadius: item != 1 ? 0 : 30,
          }}>
          {/* {item.image && (
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={{height: 100, width: 200}}
          />
        )} */}
          <Text
            style={{
              color: item == 1 ? 'black' : 'white',
              fontFamily: 'WorkSans-Regular',
              lineHeight: 25,
            }}>
            Hey! How have you been?
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: item == 1 ? 'flex-start' : 'flex-end'}}>
          <Text
            style={{
              color: '#C8C9CC',
              fontSize: 10,
              marginTop: 10,
              fontFamily: 'WorkSans-Regular',
              textAlign: 'right',
            }}>
            12:30 Am
          </Text>
        </View>
      </>
    );
  };
  return (
    <View
      style={[styles.mainView, {marginTop: Platform.OS == 'ios' ? top : 0}]}>
      <Wrapper behavior="padding" style={{flex: 1}}>
        <HeaderComp
          leftIcon={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ArrowBack
                name="left"
                onPress={() => navigation.goBack()}
                size={20}
                color={'white'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../Assets/Images/Ava.png')}
                  style={[
                    styles.image,
                    {width: 40, height: 40, borderRadius: 30},
                  ]}
                />
                <View style={{marginLeft: 10, width: '60%'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'ArialMdm',
                      fontSize: 14,
                    }}>
                    Allaxadar Rwe
                  </Text>
                  {/* <Text
                    numberOfLines={1}
                    style={{
                      color: 'white',
                      fontFamily: 'ArialCE',
                      marginTop: 5,
                      fontSize: 14,
                    }}>
                   
                  </Text> */}
                </View>
              </View>
            </View>
          }
          // label="Chat"
        />
        <View style={{flex: 1, paddingTop: 10, paddingHorizontal: 15}}>
          <FlatList data={messages} renderItem={renderItem} />
        </View>
        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            // backgroundColor: '#787878',
            // paddingBottom: 20,
            borderRadius: 100,
            marginHorizontal: 15,
            paddingHorizontal: 15,

            // paddingTop: 10,
            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#787878',
              width: '100%',
              borderRadius: 30,
              paddingHorizontal: 10,
              paddingRight: 20,
            }}>
            <TextInput
              placeholder="Type Message"
              placeholderTextColor={'white'}
              style={styles.input}
              value={message}
              onChangeText={text => setMessage(text)}
            />
            {message && (
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFBD00',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SendIcon
                  name="send"
                  size={20}
                  color={'white'}
                  // onPress={() => handleSend()}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Wrapper>
    </View>
  );
};

export default MessageScreen;
