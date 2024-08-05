import moment from 'moment';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Heart from 'react-native-vector-icons/AntDesign';
import {postApiWithFormDataWithToken} from '../../lib/Apis/api';
import {useSelector} from 'react-redux';
const PopularJobItem = ({item, navigation}) => {
  const [checkedIcon, setChecked] = useState(item.is_save);
  // console.log('checkicon', checkedIcon);
  const {user} = useSelector(state => state.user);
  const savedApi = () => {
    const form = new FormData();
    form.append('job_id', item.id);
    postApiWithFormDataWithToken(
      {url: 'savedJob', token: user?.api_token},
      form,
    ).then(res => {
      console.log('res of api', res);
    });
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(item.is_apply ? 'PostDetailHours' : 'PostDetail', {
          item,
        })
      }
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
          source={
            item.image
              ? {uri: item.image}
              : require('../../Assets/Images/UiUx.png')
          }
          style={{height: 50, borderRadius: 10, width: 50}}
        />
        <View style={{marginLeft: 15}}>
          <Text style={{color: 'white', fontSize: 16, fontFamily: 'ArialMdm'}}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: 'ArialCE'}}>
              ${item.price}
            </Text>
            <Text
              style={{color: 'white', marginLeft: 20, fontFamily: 'ArialCE'}}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => {
            setChecked(!checkedIcon);
            savedApi();
          }}
          style={{
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 15,
          }}>
          <Heart
            name={checkedIcon ? 'heart' : 'hearto'}
            color={'#FFBD00'}
            size={20}
          />
        </TouchableOpacity>
        <Text style={{color: '#FFBD00', fontSize: 11, fontFamily: 'ArialMdm'}}>
          {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobItem;
