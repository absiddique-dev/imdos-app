import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

const SearchBox = ({placeholder, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View className="flex-row flex-grow-0 px-2 items-center gap-x-1 h-[60px] mx-3 rounded-[20px] bg-[#F5F5F8]">
        <Text>
          <Icon name={'search'} size={28} />
        </Text>
        <TextInput
          placeholder={placeholder ?? 'Search city, locality'}
          className="flex-1 mr-2"
          editable={false}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBox;
