import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import HeaderComp from '../../../Component/HeaderComp';
import styles from './style';
import Input from '../../../Component/Input';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import FillButton from '../../../Component/FillButton';
const AddPost = ({navigation}) => {
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
        label="Upload Documents"
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
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  copyTo: 'cachesDirectory',
                });
                // setDocument(pickerResult);
                console.log('pickerResult', pickerResult);
                // setImages;
              } catch (e) {
                console.log('error', e);
              }
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
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Title"
              placeholder="Enter title"
              showBorder={true}
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
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Address"
              placeholder="Philadalphia America"
              showBorder={true}
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
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPost;
