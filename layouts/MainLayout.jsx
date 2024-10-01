import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Home from '../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../screens/settings';
import MyProfile from '../screens/account';
import Categories from '../screens/categories';

const Tab = createBottomTabNavigator();

const items = [
  {
    label: 'Home',
    icon: 'home',
    screen: 'Home',
    component: Home,
  },
  {
    label: 'Categories',
    icon: 'grid',
    screen: 'Categories',
    component: Categories,
  },
  {
    label: 'Account',
    icon: 'user',
    screen: 'Account',
    component: MyProfile,
  },
  {
    label: 'Settings',
    icon: 'sliders',
    screen: 'Settings',
    component: Settings,
  },
];

const renderTabBarIcon =
  iconName =>
  ({focused}) =>
    <Icon name={iconName} size={32} color={focused ? '#FF3F4B' : '#192E51'} />;

const MainLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {height: 85, paddingTop: 10},
      }}>
      {items.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.screen}
            options={{
              tabBarLabelStyle: {fontSize: 14, paddingBottom: 10},
              tabBarActiveTintColor: '#FF3F4B',
              tabBarIconStyle: {flexShrink: 0},
              tabBarIcon: renderTabBarIcon(item.icon),
            }}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MainLayout;
