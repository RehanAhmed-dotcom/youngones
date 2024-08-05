import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  View,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import HeaderComp from '../../../Component/HeaderComp';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../../Component/Input';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Icon3 from 'react-native-vector-icons/Entypo';
import {createThumbnail} from 'react-native-create-thumbnail';
import FillButton from '../../../Component/FillButton';
import Loader from '../../../Component/Loader';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
const AddPost = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [show, setShow] = useState(false);
  const [img, setImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  // console.log('image', title);
  const chosePic = (type: string) => {
    type == 'library'
      ? ImagePicker.openPicker({
          // multiple: true,
          width: 1500,
          height: 1500,
          cropping: true,
        }).then(image => {
          setShow(!show);

          // setDisable(true);
          // setTimeout(() => {
          //   uploadToS3('image', image.path, '');
          // }, 2000);

          setImg([...img, {image: image.path}]);
          // console.log(image);
          // setImgErr('');
        })
      : type == 'camera'
      ? ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropping: false,
        }).then(image => {})
      : ImagePicker.openPicker({
          mediaType: 'video',
        })
          .then(video => {
            // console.log('video', video);
            setShow(!show);
            // setTimeout(() => {
            //   setShowModal(true);
            // }, 1000);
            // setDisable(true);
            // setImgErr("");
            // setImg([...img, video.path]);
            //   console.log(video);
            createThumbnail({
              url: video.path,
              timeStamp: 10000,
            })
              .then(responce => {
                // uploadToS3('video', video.path, responce.path);
                setImg([...img, {video: video.path, thumbnil: responce.path}]);
                // setImgErr('');
                // console.log(setThumb(responce.path));
              })
              .catch(err => Alert.alert(err));
            //   console.log(video);
          })
          .catch(err => {
            // Alert.alert(err.Error);
            console.log('err in video select', err);
          });
  };
  const myModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setShow(!show);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: '30%',
            width: '90%',
            backgroundColor: '#373A43',
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 10,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Icon3 name="circle-with-cross" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              //   backgroundColor: 'blue',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                // setShow(!show);
                chosePic('library');
              }}
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                borderRadius: 20,
              }}>
              <Text style={{color: 'black', fontFamily: 'ArialMdm'}}>
                Picture
              </Text>
            </TouchableOpacity>

            {/* <Button
              title={'Video'}
              onPress={() => {
                choosePic('video');
                setModalVisible(!modalVisible);
                setCheck('video');
              }}
            /> */}
            <View style={{marginTop: 20}} />
            <TouchableOpacity
              onPress={() => {
                // setShow(!show);
                chosePic('video');
              }}
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                borderRadius: 20,
              }}>
              <Text style={{color: 'black', fontFamily: 'ArialMdm'}}>
                Video
              </Text>
            </TouchableOpacity>

            {/* <Button
              title={'Picture'}
              onPress={() => {
                choosePic('picture');
                setModalVisible(!modalVisible);
                setCheck('image');
              }}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
  const renderItem = ({item}) => (
    <View
      style={{
        width: widthPercentageToDP(90),
        marginRight: 20,
        marginVertical: 20,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: 'white',
        elevation: 2,
        // padding: 20,
        overflow: 'hidden',
        backgroundColor: '#373A43',
        height: 200,
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: item.image ? item.image : item.thumbnil}}
          style={{height: 200, width: widthPercentageToDP(90)}}
        />
      </View>
    </View>
  );
  const post = () => {
    setShowModal(true);
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('description', desc);
    img.forEach(item => {
      data.append('images[]', {
        uri: item.image ? item.image : item.video,
        type: item.image ? 'image/jpeg' : 'video/mp4',
        name: item.image
          ? `image${Math.random()}.jpg`
          : `video${Math.random()}.mp4`,
      });
    });
    postApiWithFormDataWithToken(
      {url: 'addNewPost', token: user?.api_token},
      data,
    )
      .then(res => {
        console.log('res of post', res);
        setShowModal(false);
        if (res.status == 'success') {
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log('err', err);
        setShowModal(false);
      });
  };
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? top : 0}]}>
      <HeaderComp
        leftIcon={
          <ArrowLeft
            name={'left'}
            size={20}
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        label="Upload Post"
      />

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              setShow(!show);
            }}
            style={{
              backgroundColor: '#373A43',
              marginTop: 40,
              height: 150,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#9D97B5',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../Assets/Images/upload.png')}
              style={{height: 50, tintColor: 'white', width: 50}}
            />
            <Text
              style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 10}}>
              Add Image Or Video
            </Text>
          </TouchableOpacity>
          <View style={{width: '100%'}}>
            <FlatList
              nestedScrollEnabled={true}
              data={img}
              horizontal
              renderItem={renderItem}
            />
          </View>
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Title"
              placeholder="Enter title"
              showBorder={true}
              value={title}
              onChangeText={text => setTitle(text)}
              // onBlur={handleBlur('email')}
              // error={errors.email}
              // touched={touched.email}
              // image1={
              //   <Image
              //     source={require('../../../Assets/Images/emailImage.png')}
              //     style={styles.passwordImage}
              //     resizeMode="contain"
              //   />
              // }
            />
          </View>
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Address"
              placeholder="Philadalphia America"
              showBorder={true}
              value={address}
              onChangeText={text => setAddress(text)}
              // value={values.email}
              // onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
              // error={errors.email}
              // touched={touched.email}
              // image1={
              //   <Image
              //     source={require('../../../Assets/Images/emailImage.png')}
              //     style={styles.passwordImage}
              //     resizeMode="contain"
              //   />
              // }
            />
          </View>
          {/* <Text style={{color: 'white'}}>Additional details</Text> */}
          <Text style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 20}}>
            Description
          </Text>
          <TextInput
            placeholder="Write here..."
            placeholderTextColor={'white'}
            textAlignVertical="top"
            value={desc}
            onChangeText={text => setDesc(text)}
            style={{
              backgroundColor: '#373A43',
              borderRadius: 20,
              padding: 20,
              fontFamily: 'ArialCE',
              marginTop: 10,
              height: 200,
            }}
          />

          <View style={{marginVertical: 40}}>
            <FillButton
              customColor="#FFBD00"
              customTextColor="white"
              Name="Upload Post"
              onPress={() => post()}
            />
          </View>
        </View>
      </ScrollView>
      {myModal()}
      {Loader({show: showModal})}
    </View>
  );
};

export default AddPost;
