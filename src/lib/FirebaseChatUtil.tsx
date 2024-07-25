import database from '@react-native-firebase/database';

export const senderMsg = async (
  msgValue,
  image,
  currentUserId,
  guestUserId,
  date,
) => {
  console.log('inside sender function', image);
  try {
    return await database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image,
          date,
          // image:imgeSource
        },
      });
  } catch (error) {
    console.log('error in send message', error);
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  image,
  currentUserId,
  guestUserId,
  date,
) => {
  try {
    return await database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image,
          date,
          // image:imgeSource
        },
      });
  } catch (error) {
    console.log('error in reciving message ', error);
    return error;
  }
};
