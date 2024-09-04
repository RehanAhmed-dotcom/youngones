import database from '@react-native-firebase/database';

// export const senderMsg = async (
//   msgValue,
//   // image,
//   currentUserId,
//   guestUserId,
//   date,
//   // chatId,
// ) => {
//   // console.log('inside sender function', chatId);
//   try {
//     const variabele = await database()
//       .ref('messeges/' + currentUserId)
//       .child(guestUserId)

//       .push();
//     const childKey = variabele.key;
//     console.log('childkey', childKey);
//     return variabele.set({
//       messege: {
//         sender: currentUserId,
//         reciever: guestUserId,
//         msg: msgValue,
//         // image,
//         date,
//         // chatId,
//         _id: childKey,
//         // image:imgeSource
//       },
//     });
//   } catch (error) {
//     // console.log('error in send message', error);
//     return error;
//   }
// };

// export const recieverMsg = async (
//   msgValue,
//   // image,
//   currentUserId,
//   guestUserId,
//   date,
//   chatId,
// ) => {
//   try {
//     const variabele = await database()
//       .ref('messeges/' + guestUserId)
//       .child(currentUserId)

//       .push();
//     const childKey = variabele.key;
//     console.log('childkey', childKey);
//     return variabele.set({
//       messege: {
//         sender: currentUserId,
//         reciever: guestUserId,
//         msg: msgValue,
//         // image,
//         date,
//         _id: childKey,

//         // image:imgeSource
//       },
//     });
//   } catch (error) {
//     console.log('error in reciving message ', error);
//     return error;
//   }
// };
export const senderMsg = async (
  msgValue,
  // image,
  currentUserId,
  guestUserId,
  date,
  childKey,
) => {
  // console.log('inside sender function', chatId);
  try {
    return await database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .child(childKey)
      .set({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          // image,
          date,
          // chatId,
          _id: childKey,
          // image:imgeSource
        },
      });
  } catch (error) {
    // console.log('error in send message', error);
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  // image,
  currentUserId,
  guestUserId,
  date,
  childKey,
) => {
  try {
    return await database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .child(childKey)
      .set({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          // image,
          date,
          _id: childKey,

          // image:imgeSource
        },
      });
  } catch (error) {
    console.log('error in reciving message ', error);
    return error;
  }
};
