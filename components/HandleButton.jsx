import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const HandleButton = ({name}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row justify-center items-center h-full">
      <View className="bg-[#FF3F4B] h-[55px] rounded-xl mt-2 w-full">
        <Text className="text-[14px] text-white">{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HandleButton;
