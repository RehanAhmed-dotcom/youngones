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
const AccountInfo = ({navigation}) => {
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
        label="Account"
      />

      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../../Assets/Images/profile.png')}
              style={{
                height: 80,
                borderRadius: 40,
                alignSelf: 'center',
                width: 80,
                marginTop: 30,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <Input
                label="First Name"
                placeholder="Alaxander tobi"
                // value={email}
                // onChangeText={text => setEmail(text)}
                showBorder={true}
                //   value={values.name}
                //   onChangeText={handleChange('name')}
                //   onBlur={handleBlur('name')}
                //   error={errors.name}
                //   touched={touched.name}
                //   onBlur={handleBlur('email')}
                //   error={errors.email}
                //   touched={touched.email}
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <Input
                label="Last Name"
                placeholder="Alaxander tobi"
                // value={email}
                // onChangeText={text => setEmail(text)}
                showBorder={true}
                //   value={values.name}
                //   onChangeText={handleChange('name')}
                //   onBlur={handleBlur('name')}
                //   error={errors.name}
                //   touched={touched.name}
                //   onBlur={handleBlur('email')}
                //   error={errors.email}
                //   touched={touched.email}
              />
            </View>
          </View>
          <View style={{height: 10}} />
          <View style={styles.mainInputView}>
            <Input
              label="Email"
              placeholder="Enter Email"
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
              label="Phone Number"
              placeholder="Enter Phone Number"
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

          <View style={{marginVertical: heightPercentageToDP(25)}}>
            <FillButton
              customColor="black"
              customTextColor="white"
              Name="Change Password"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountInfo;
