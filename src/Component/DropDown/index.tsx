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
  setItem?: (value: any) => void;
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
  setItem,
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
            fontFamily: 'ArialMdm',
            color: 'white',
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
        setItems={setItem}
        placeholder={placeholder}
        placeholderStyle={{color: 'white', fontFamily: 'ArialCE'}}
        onSelectItem={selectItem}
        maxHeight={150}
        dropDownDirection="BOTTOM"
        zIndex={3000}
        zIndexInverse={1000}
        textStyle={{color: 'white', fontSize: 12, fontFamily: 'ArialCE'}}
        nestedScrollEnabled={true}
        // listMode="SCROLLVIEW"
        listMode="SCROLLVIEW"
        // Possible prop adjustments for positioning
        bottomOffset={50}
        labelStyle={{fontFamily: 'ArialCE', marginLeft: 10, color: 'white'}}
        searchPlaceholderTextColor="white"
        tickIconStyle={{tintColor: 'white', fontSize: 10, size: 10}}
        arrowIconStyle={{tintColor: 'white', marginRight: 10}}
        style={{
          backgroundColor: '#373A43',
          borderRadius: 15,
          borderWidth: 0,
          width: '100%',

          paddingHorizontal: 10,
        }}
        // style={{
        //   // backgroundColor
        //   backgroundColor: '',

        //   height: 50,
        //   borderWidth: 0,
        //   ...itemStyle,
        // }}
        dropDownContainerStyle={{
          backgroundColor: '#373A43',
          borderColor: 'white',

          borderWidth: 0,
          paddingHorizontal: 10,
          ...dropDownStyle,
        }}
        zIndex={3000}
        zIndexInverse={1000}
      />
    </>
  );
};

export default DropDown;
