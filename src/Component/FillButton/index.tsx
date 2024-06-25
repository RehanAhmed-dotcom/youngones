import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';
interface ButtonProps {
  Name: string;
  onPress: () => void;
  customColor?: string;
  customTextColor?: string;
  disabled?: boolean;
  midButton?: boolean;
}
const FillButton: React.FC<ButtonProps> = ({
  Name,
  customColor,
  customTextColor,
  disabled,
  midButton,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonView,
        {
          backgroundColor: customColor ? customColor : 'white',
          height: midButton ? 40 : 50,
        },
      ]}>
      <Text
        style={[
          styles.name,

          {
            color: customTextColor ? customTextColor : '#46A4DF',
            fontSize: midButton ? 14 : 16,
            fontFamily: midButton ? 'ArialMdm' : 'Arial-Bold',
          },
        ]}>
        {Name}
      </Text>
    </TouchableOpacity>
  );
};

export default FillButton;
