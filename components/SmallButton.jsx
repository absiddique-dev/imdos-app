import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const SmallButton = ({text, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View className="bg-[#EF5350] px-4 py-2 rounded-xl">
        <Text className="text-white">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallButton;
