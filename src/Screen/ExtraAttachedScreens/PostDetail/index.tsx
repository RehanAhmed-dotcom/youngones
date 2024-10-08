import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import moment from 'moment';
import {postApiWithFormDataWithToken} from '../../../lib/Apis/api';
import {useSelector} from 'react-redux';
const PostDetail = ({navigation, route}) => {
  const {item} = route.params;
  const {user} = useSelector(state => state.user);
  // console.log('item', item);
  const savedApi = () => {
    const form = new FormData();
    form.append('job_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'savedJob', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of saved api', res);
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
        label={item.title}
      />
      <Image
        source={
          item?.image
            ? {uri: item?.image}
            : require('../../../Assets/Images/ExpendedLogo.png')
        }
        style={{width: '100%', height: heightPercentageToDP(30)}}
      />
      <ScrollView>
        <View
          style={{
            width: '90%',
            flex: 1,
            //   backgroundColor: 'red',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text
              style={{color: '#6A6A6A', fontSize: 12, fontFamily: 'ArialCE'}}>
              {item?.location}
            </Text>
            <Text
              style={{color: '#6A6A6A', fontSize: 12, fontFamily: 'ArialCE'}}>
              {moment(item?.updated_at).fromNow()}
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate('PostDetail')}
            style={{
              backgroundColor: '#373A43',
              width: '100%',
              // height: 100,
              marginBottom: 20,
              flexDirection: 'row',
              elevation: 1,
              shadowColor: '#FAFAFA',
              // shadowColor: '#000', // Shadow color
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.5,
              shadowRadius: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../../Assets/Images/girl.jpeg')}
                style={{height: 50, borderRadius: 10, width: 50}}
              />
              <View style={{marginLeft: 15, width: '70%'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'ArialMdm',
                  }}>
                  Admin
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{color: 'white', fontFamily: 'ArialCE'}}>
                    Le Lorem Ipsum est simpl ement du faux texte employé dans
                    lae
                  </Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MessageScreen', {item: item.admin})
                }
                style={{
                  backgroundColor: '#FFBD00',
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // bottom: 15,
                }}>
                <ChatIcon name={'chatbubble-sharp'} size={20} color={'white'} />
                {/* <Heart name="hearto" color={'#4D00DE'} size={20} /> */}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Job type
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item?.type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Job duration
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item?.duration}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Price
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              ${item?.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Skills
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item?.skills}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Payment
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item?.payment}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
              Number of freelancers
            </Text>
            <Text style={{color: 'white', fontSize: 14, fontFamily: 'ArialCE'}}>
              {item.totalApplicant == 0
                ? 'Be the first to apply on job'
                : `${item.totalApplicant} out of ${item.no_freelancers}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Apply"
                midButton={true}
                onPress={() =>
                  !item.applyStatus
                    ? navigation.navigate('UploadDocuments', {item})
                    : Alert.alert(
                        'Error',
                        'Freelancers are completed for this job',
                      )
                }
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="#2D2D35"
                onPress={() => savedApi()}
                customTextColor="white"
                Name={item.is_save ? 'Saved' : 'Save'}
                midButton={true}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'ArialMdm',
                marginTop: 30,
                marginBottom: 10,
              }}>
              About Job
            </Text>
            <Text
              style={{
                color: '#D6D6D6',
                marginBottom: 20,
                fontFamily: 'ArialCE',
              }}>
              {item?.description}
            </Text>
          </View>
          <View>
            {/* <Text
              style={{
                color: 'white',
                fontFamily: 'ArialMdm',
                marginTop: 20,
                marginBottom: 10,
              }}>
              Requirements
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetail;
