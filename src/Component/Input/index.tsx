import React from 'react';
import {
  TextInput,
  ImageProps,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import styles from './style';
interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  value: string;
  type?: string;
  image1?: JSX.Element;
  image2?: JSX.Element;
  error?: string;
  bigInput?: boolean;
  nonEditable?: boolean;
  secureText?: boolean;
  secureToggle?: () => void;
  touched?: boolean;
  showBorder?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChangeText,
  value,
  type,
  onBlur,
  image1,
  nonEditable,
  showBorder,
  secureText,
  error,
  image2,
  bigInput,
  touched,
  secureToggle,
}) => {
  return (
    <View style={styles.mainInputView}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.row,
          {borderWidth: 0, borderColor: '#B5DBEC'},
          // {borderColor: error && touched ? 'red' : '#CF9F16'},
        ]}>
        {/* {image1 && image1} */}
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          returnKeyType="done"
          editable={nonEditable ? false : true}
          keyboardType={type == 'Number' ? 'phone-pad' : 'default'}
          placeholderTextColor={'white'}
          secureTextEntry={secureText ? true : false}
          style={[
            styles.inputView,
            {
              height: bigInput ? 200 : 60,
              // backgroundColor: bigInput ? 'red' : 'grey',
            },
          ]}
        />
        <TouchableOpacity onPress={secureToggle}>
          {image2 && image2}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Input;
