import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  OrderScreenRouteProp,
  OrdersScreenNavigationProp,
} from '../types/navigation';
import colors from '../constants/colors';
import DeliveryCard from '../components/DeliveryCard';

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const route = useRoute<OrderScreenRouteProp>();

  const {
    params: { order },
  } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerBackTitle: 'Deliveries',
      headerTintColor: colors.primaryOrders,
      headerTitleStyle: {
        color: 'black',
      },
    });
  }, [order]);

  return (
    <View className="-mt-2">
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
