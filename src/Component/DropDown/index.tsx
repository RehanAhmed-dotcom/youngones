import {useState} from 'react';
import {Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
export interface DropdownProps {
  items: {id: number; label: string; value: any}[]; // Replace `any` with a more specific type if needed
  value: any; // Currently selected value
  open: boolean; // State of dropdown
  setOpen: (open: boolean) => void; // Function to update open state
  setValue: (value: any) => void; // Function to update selected value
  placeholder?: string;
  onChange: (value: any) => void; // Function to handle changes
  selectItem: (value: any) => void;
  containerStyle?: object;
  label: string;
  itemStyle?: object;
  dropDownStyle?: object;
}
const DropDown: React.FC<DropdownProps> = ({
  items,
  value,
  open,
  label,
  setOpen,
  setValue,
  placeholder = 'Select Category',
  onChange,
  selectItem,
  containerStyle,
  itemStyle,
  dropDownStyle,
}) => {
  //   const [items, setItems] = useState([
  //     {label: 'Apple', value: 'apple'},
  //     {label: 'Banana', value: 'banana'},
  //   ]);
  return (
    <>
      {label && (
        <Text
          style={{
            fontSize: 14,
            marginBottom: 10,
            fontFamily: 'WorkSans-Medium',
            color: 'black',
          }}>
          {label}
        </Text>
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={value => {
          setValue(value); // Parent controls value change
          onChange(value); // Optional: notify parent about the change
        }}
        placeholder={placeholder}
        placeholderStyle={{color: 'grey', fontFamily: 'WorkSans-Regular'}}
        onSelectItem={selectItem}
        dropDownDirection="BOTTOM"
        zIndex={3000}
        zIndexInverse={1000}
        nestedScrollEnabled={true}
        // listMode="SCROLLVIEW"
        listMode="SCROLLVIEW"
        // Possible prop adjustments for positioning
        bottomOffset={50}
        labelStyle={{fontFamily: 'WorkSans-Regular'}}
        searchPlaceholderTextColor="grey"
        style={{
          // backgroundColor
          backgroundColor: '#F6F7F9',

          height: 50,
          borderWidth: 0,
          ...itemStyle,
        }}
        dropDownContainerStyle={{backgroundColor: '#fafafa', ...dropDownStyle}}
        zIndex={3000}
        zIndexInverse={1000}
      />
    </>
  );
};

export default DropDown;
