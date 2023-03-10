import { Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomersScreen from '../screens/CustomersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import { Icon } from '@rneui/themed';

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primaryCustomers,
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, size, color }) => {
          if (route.name === 'Customers') {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? colors.primaryCustomers : 'gray'}
              />
            );
          } else if (route.name === 'Orders') {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? colors.primaryOrders : 'gray'}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
