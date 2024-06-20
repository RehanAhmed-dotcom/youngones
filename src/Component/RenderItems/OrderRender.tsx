import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {useSelector} from 'react-redux';
import ApproveModal from '../ApproveModal';
import {
  postApiWithFormDataWithToken,
  postApiWithSimplePayload,
} from '../../lib/Apis/api';

const OrderRender = ({item, index, data, navigation, refresh}) => {
  const {user} = useSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const approveFunc = () => {
    setShowModal(false);
  };
  const ApproveApi = () => {
    const formdata = new FormData();
    formdata.append('order_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'approve_req', token: user?.api_token},
      formdata,
    )
      .then(res => {
        console.log('res of order id', res);
        if (res.status == 'success') {
          refresh();
        }
      })
      .catch(err => {
        console.log('err in approve', err);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetail', {item})}
      style={styles.chatItem}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Medium',
              fontSize: 16,
            }}>
            {user?.type == 'seller'
              ? user.serviceName
              : item?.seller?.serviceName}
          </Text>
        </View>
        {data && (
          <View
            style={[
              styles.pending,
              {
                backgroundColor:
                  data == 'Completed'
                    ? '#3CAE5C'
                    : data == 'Pending'
                    ? 'red'
                    : '#FD6922',
              },
            ]}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'WorkSans-Regular',
                color: 'white',
              }}>
              {item.work_status}
            </Text>
          </View>
        )}
        {!data && (
          <View
            style={[
              styles.pending,
              {
                backgroundColor:
                  item.work_status == 'In Progress'
                    ? '#FD6922'
                    : item.work_status == 'Pending'
                    ? '#EA2F2F'
                    : item.work_status == 'Cancel'
                    ? '#FF0303'
                    : item.work_status == 'Completed'
                    ? '#3CAE5C'
                    : '#400D0A',
              },
            ]}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'WorkSans-Regular',
                color: 'white',
              }}>
              {item.work_status}
              {/* {index == 0
                ? 'In Progress'
                : index == 1
                ? 'Pending'
                : index == 2
                ? 'Cancel'
                : index == 3
                ? 'Completed'
                : 'Rejected'} */}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          width: '100%',
        }}>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Regular',
              fontSize: 14,
            }}>
            Date
          </Text>
        </View>
        {/* <View style={styles.pending}> */}
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'WorkSans-Regular',
            color: 'black',
            marginRight: 10,
          }}>
          {item.date}
        </Text>
        {/* </View> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          marginTop: 5,
          width: '100%',
        }}>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Regular',
              fontSize: 14,
            }}>
            Time
          </Text>
        </View>
        {/* <View style={styles.pending}> */}
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'WorkSans-Regular',
            color: 'black',
            marginRight: 10,
          }}>
          {item.time}
        </Text>
        {/* </View> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
          width: '100%',
        }}>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'WorkSans-Regular',
              fontSize: 14,
            }}>
            {user?.type == 'seller' ? 'Buyer' : 'Seller'}
          </Text>
        </View>
        {/* <View style={styles.pending}> */}
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'WorkSans-Regular',
            color: 'black',
            marginRight: 10,
          }}>
          {user?.type == 'seller'
            ? item?.buyer?.fullname
            : item?.seller?.fullname}
        </Text>
        {/* </View> */}
      </View>
      {user?.type == 'buyer' && item.work_status == 'Waiting for Approval' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 15,
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() =>
              item.payment_status == 'Pending'
                ? setShowModal(true)
                : ApproveApi()
            }
            style={{
              width: '45%',
              height: 50,
              backgroundColor: '#0E7DAF',
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontFamily: 'WorkSans-Regular',
              }}>
              Approve
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SellerLogin')}
            style={{
              width: '45%',
              height: 50,
              backgroundColor: '#FFFFFFB2',
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: 'WorkSans-Regular',
              }}>
              Disapprove
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ApproveModal
        show={showModal}
        // navigationFunc={approveFunc}
        hideModal={approveFunc}
      />
    </TouchableOpacity>
  );
};

export default OrderRender;
