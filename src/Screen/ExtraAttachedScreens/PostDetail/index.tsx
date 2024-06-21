import React from 'react';
import {
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
const PostDetail = ({navigation}) => {
  const item = {
    Image: require('../../../Assets/Images/Facebook.png'),
    post: 'UI/UX Designer',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
    amount: '4500',

    location: 'Toronto, Canada',
    time: '14 hrs ago',
    // postImage: require('../Assets/Images/PostImage.png'),
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
        label="UI/UX Designer"
      />
      <Image
        source={require('../../../Assets/Images/UiUx.png')}
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
              Philadalphia America
            </Text>
            <Text
              style={{color: '#6A6A6A', fontSize: 12, fontFamily: 'ArialCE'}}>
              3 weeks ago
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetail')}
            style={{
              backgroundColor: '#373A43',
              width: '100%',
              // height: 100,
              marginBottom: 20,
              flexDirection: 'row',
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
                source={require('../../../Assets/Images/profilePick.png')}
                style={{height: 50, width: 50}}
              />
              <View style={{marginLeft: 15, width: '60%'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'ArialMdm',
                  }}>
                  Owen Hunt
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
                    Le Lorem Ipsum est simplement du faux texte employé dans lae
                  </Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
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
              3-4 hours
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
              1 month
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
              $50 /hr
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
              User Interface Design - User Experience
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
                onPress={() => navigation.navigate('UploadDocuments')}
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="black"
                customTextColor="white"
                Name="Save"
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
            <Text style={{color: '#D6D6D6', fontFamily: 'ArialCE'}}>
              Dolor velit in duis pariatur ut nostrud exercitation ex voluptate
              Lorem officia nisi. Sunt laborum in quis nostrud adipisicing
              mollit. Dolore incididunt consequat dolore laboris id cillum. Et
              anim do cupidatat esse duis. Aliquip nostrud labore pariatur qui.
              Pariatur proident ex id ea laborum eu. Aliquip aliquip mollit
              officia exercitation excepteur.
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'ArialMdm',
                marginVertical: 20,
              }}>
              Requirements
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: 7,
                }}></View>
              <Text
                style={{
                  color: '#C2C2C2',
                  fontFamily: 'ArialCE',
                  marginLeft: 10,
                }}>
                Lorem ipsusm is a text designed for developers
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: 7,
                }}></View>
              <Text
                style={{
                  color: '#C2C2C2',
                  fontFamily: 'ArialCE',
                  marginLeft: 10,
                  lineHeight: 20,
                }}>
                Lorem ipsusm is a text designed for developers Lorem ipsusm is a
                text designed for developers
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: 7,
                }}></View>
              <Text
                style={{
                  color: '#C2C2C2',
                  fontFamily: 'ArialCE',
                  marginLeft: 10,
                  lineHeight: 20,
                }}>
                Lorem ipsusm is a text designed for developers Lorem ipsusm is a
                text designed for developers
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 20,
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  backgroundColor: 'white',

                  borderRadius: 10,
                  marginTop: 7,
                }}></View>
              <Text
                style={{
                  color: '#C2C2C2',
                  fontFamily: 'ArialCE',
                  marginLeft: 10,
                  lineHeight: 20,
                }}>
                Lorem ipsusm is a text designed for developers Lorem ipsusm is a
                text designed for developers Lorem ipsusm is a text designed for
                developers
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetail;
