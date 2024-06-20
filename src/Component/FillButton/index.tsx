import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';
interface ButtonProps {
  Name: string;
  onPress: () => void;
  customColor?: string;
  customTextColor?: string;
  disabled?: boolean;
}
const FillButton: React.FC<ButtonProps> = ({
  Name,
  customColor,
  customTextColor,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonView,
        {backgroundColor: customColor ? customColor : 'white'},
      ]}>
      <Text
        style={[
          styles.name,
          {color: customTextColor ? customTextColor : '#46A4DF'},
        ]}>
        {Name}
      </Text>
    </TouchableOpacity>
  );
};

export default FillButton;
