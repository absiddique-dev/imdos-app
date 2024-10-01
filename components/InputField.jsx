import {View, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const InputField = ({
  placeholder,
  icon,
  value,
  onChangeText,
  type,
  multiline,
  edit,
}) => {
  return (
    <View className="bg-[#F5F5F8] w-full py-2 rounded-2xl flex-row items-center px-4 mb-3">
      <Icon name={icon} size={20} color="#607698" />
      <TextInput
        style={{padding: 10}}
        placeholder={placeholder}
        placeholderTextColor="#607698"
        className="text-[#607698] pe-2 w-full"
        value={value}
        multiline={multiline ?? false}
        onChangeText={onChangeText}
        keyboardType={type ?? 'default'}
        editable={edit ?? true}
        numberOfLines={multiline ? 3 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

export default InputField;
