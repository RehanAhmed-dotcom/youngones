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
import Loader from '../../../Component/Loader';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
const AddHours = ({navigation, route}) => {
  const {item} = route.params;
  const {user} = useSelector(state => state.user);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [more, setMore] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    setDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = date => {
    // console.warn('A date has been picked: ', date);
    setStartTime(moment(date).format('hh:mm A'));
    hideDatePicker1();
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = date => {
    // console.warn('A date has been picked: ', date);
    setEndTime(moment(date).format('hh:mm A'));
    hideDatePicker2();
  };
  const addHour = () => {
    setShowModal(true);
    const data = new FormData();
    data.append('job_id', item.id);
    data.append('date', date);
    data.append('start_time', startTime);
    data.append('end_time', endTime);
    data.append('description', more);
    postApiWithFormDataWithToken(
      {url: 'addHours', token: user?.api_token},
      data,
    )
      .then(res => {
        console.log('add hours', res);
        setShowModal(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log('err in add hours', err);
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
              <TouchableOpacity
                onPress={() => showDatePicker1()}
                style={{
                  backgroundColor: '#373A43',
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
                  {startTime ? startTime : 'Start Time'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="time"
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '47%'}]}>
              <TouchableOpacity
                onPress={() => showDatePicker2()}
                style={{
                  backgroundColor: '#373A43',
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
                  {endTime ? endTime : 'End Time'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="time"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
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
            value={more}
            onChangeText={text => setMore(text)}
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
              onPress={() => addHour()}
            />
          </View>
        </View>
      </ScrollView>
      {Loader({show: showModal})}
    </View>
  );
};

export default AddHours;
