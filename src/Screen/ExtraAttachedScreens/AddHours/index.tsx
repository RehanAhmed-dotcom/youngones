import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
import moment from 'moment';
const AddHours = ({navigation}) => {
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    setDate(moment(date).format('DD-MM-YY'));
    hideDatePicker();
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
          <View>
            <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>Date</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                height: 50,
                paddingHorizontal: 20,
                justifyContent: 'center',
                backgroundColor: '#373A43',
                marginTop: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
                {date ? date : 'Select Date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={[styles.mainInputView, {marginTop: 30, width: '47%'}]}>
              <Input
                label="Working Hours"
                placeholder="Start Time"
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
            <View style={[styles.mainInputView, {marginTop: 30, width: '47%'}]}>
              <Input
                // label="Last Name"
                placeholder="End Time"
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
              Name="Apply"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddHours;
