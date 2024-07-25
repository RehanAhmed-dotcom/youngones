import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSend = async () => {
    if (message.trim() === '') return;

    setResponses([...responses, {text: message, type: 'user'}]);

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: message,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Ensure 'choices' and 'text' exist in the response data
      const chatResponse =
        data?.choices?.[0]?.text || 'No response from the model';
      setResponses([
        ...responses,
        {text: message, type: 'user'},
        {text: chatResponse, type: 'bot'},
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error.message);
      setResponses([
        ...responses,
        {text: message, type: 'user'},
        {text: 'Error: Could not get response', type: 'bot'},
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {responses.map((item, index) => (
          <Text
            key={index}
            style={
              item.type === 'user' ? styles.userMessage : styles.botMessage
            }>
            {item.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        placeholderTextColor={'black'}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default ChatComponent;
