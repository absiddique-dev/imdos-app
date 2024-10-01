import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

const items = [
  {
    label: 'Home',
    icon: 'home',
    screen: 'Home',
  },
  {
    label: 'Categories',
    icon: 'grid',
    screen: 'Categories',
  },
  {
    label: 'Account',
    icon: 'user',
    screen: 'Account',
  },
  {
    label: 'Wishlist',
    icon: 'list',
    screen: 'Wishlist',
  },
];

const BottomNavigation = () => {
  return (
    <View className="py-3 items-end flex-row justify-between px-6 bg-[#fff] dark:bg-zinc-900 w-full">
      {items.map((item, index) => {
        return (
          <View className="items-center space-y-1" key={index}>
            <Icon name={item.icon} size={32} color="#192E51" />
            <Text>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
