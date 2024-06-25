import React, {useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import HeaderComp from '../../../Component/HeaderComp';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import PopularJobItem from '../../../Component/PopularJobItem';
import FillButton from '../../../Component/FillButton';
import InvoiceItems from '../../../Component/InvoiceItems';
const PostDetailHours = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const ShowInvoice = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowModal(!showModal)}
      transparent={true}
      visible={showModal}>
      <View
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
        <View>
          <View
            style={{
              width: widthPercentageToDP(90),
              // height: 300,
              // backgroundColor: 'red',
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <CrossIcon
                name="cross"
                color={'white'}
                onPress={() => setShowModal(!showModal)}
                size={20}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                width: widthPercentageToDP(90),
                // height: 20,
                borderRadius: 15,
                backgroundColor: '#373A43',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingTop: 20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'Arial-Bold',
                    }}>
                    Job Invoice
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'ArialMdm',
                    }}>
                    UI/UX Designer
                  </Text>
                </View>
                <Icon name="briefcase-outline" size={30} color={'white'} />
              </View>
              <Image
                source={require('../../../Assets/Images/UiUx.png')}
                style={{height: 200, width: '100%', marginTop: 20}}
              />
              <View style={{backgroundColor: '#2D2D35', width: '100%'}}>
                <InvoiceItems
                  first={'Username'}
                  second={'John Travolta'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Phone Number'}
                  second={'0333-XXXXXXX'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Date'}
                  second={'24, Feburary, 2020'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Working Hours'}
                  second={'3-5 hrs'}
                  showBorder={true}
                />
                <InvoiceItems
                  first={'Invoice ID'}
                  second={'IV93592'}
                  showBorder={true}
                />
                <InvoiceItems first={'Tax Fee'} second={'$100'} />
                <InvoiceItems first={'Servie Fee'} second={'$20'} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  SubTotal
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial-Bold',
                  }}>
                  $120
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
  const FilterModal = () => (
    <Modal
      animationType="slide"
      onRequestClose={() => setShowModal1(!showModal1)}
      transparent={true}
      visible={showModal1}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'flex-end',

          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        {/* <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{
            paddingVertical: 20,
            alignItems: 'center',
          }}> */}
        <View
          style={{
            backgroundColor: '#2D2D35',
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: heightPercentageToDP(90),
          }}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontSize: 18,
                fontFamily: 'Arial-Bold',
                marginTop: 20,
              }}>
              Work Submission
            </Text>
            <Image
              resizeMode="contain"
              source={require('../../../Assets/Images/illustration.png')}
              style={{width: '100%', height: 250, marginTop: 40}}
            />
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
                tintColor={'#FFBD00'}
                source={require('../../../Assets/Images/upload.png')}
                style={{height: 50, tintColor: 'white', width: 50}}
              />
              <Text
                style={{color: 'white', fontFamily: 'ArialMdm', marginTop: 10}}>
                Upload CV/Resume
              </Text>
            </TouchableOpacity>
            <View style={{marginTop: 50}}>
              <FillButton
                customColor="#FFBD00"
                customTextColor="white"
                Name="Submit Work"
                onPress={() => {
                  setShowModal1(false);
                  setTimeout(() => {
                    setShowModal(true);
                  }, 500);
                }}
              />
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
  return (
    <View
      style={[styles.mainView, {paddingTop: Platform.OS == 'ios' ? 30 : 0}]}>
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
              <View style={{marginLeft: 15, width: '70%'}}>
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
                    Le Lorem Ipsum est simpl ement du faux texte employé dans
                    lae
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
                Name="Submit Wrok"
                midButton={true}
                onPress={() => setShowModal1(!showModal1)}
              />
            </View>
            <View style={[styles.mainInputView, {marginTop: 30, width: '45%'}]}>
              <FillButton
                customColor="black"
                customTextColor="white"
                Name="Add Hours"
                midButton={true}
                onPress={() => navigation.navigate('AddHours')}
              />
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#FFBD00',
              borderRadius: 10,
              width: '100%',
              marginTop: 20,
            }}>
            <View
              style={{
                backgroundColor: '#FFBD00',
                width: 150,
                height: 40,
                borderTopLeftRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 10,
              }}>
              <Text style={{color: 'black', fontFamily: 'ArialMdm'}}>
                Additional Hours
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                marginLeft: 15,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
                12 - 6 - 2024
              </Text>
              <Text
                style={{color: 'white', marginLeft: 40, fontFamily: 'ArialCE'}}>
                4hrs
              </Text>
              <Text
                style={{
                  color: '#FFBD00',
                  marginLeft: 20,
                  fontFamily: 'ArialCE',
                  fontSize: 10,
                }}>
                Waiting for approval
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 15,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
                12 - 6 - 2024
              </Text>
              <Text
                style={{color: 'white', marginLeft: 40, fontFamily: 'ArialCE'}}>
                4hrs
              </Text>
            </View>
            <Text
              onPress={() => navigation.navigate('AddHours')}
              style={{color: '#FFBD00', marginTop: 10, marginLeft: 15}}>
              More+
            </Text>
            <View
              style={{
                marginTop: 40,
                borderTopWidth: 1,
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                borderTopColor: '#FFBD00',
              }}>
              <Text style={{color: 'white', fontFamily: 'ArialMdm'}}>
                Total Hours:-
              </Text>
              <Text
                style={{
                  color: 'white',
                  // marginLeft: 40,
                  fontFamily: 'ArialMdm',
                }}>
                4hrs
              </Text>
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
                marginTop: 20,
                marginBottom: 10,
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
                marginTop: 10,
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
                marginTop: 10,
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
                marginVertical: 10,
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
      {ShowInvoice()}
      {FilterModal()}
    </View>
  );
};

export default PostDetailHours;
