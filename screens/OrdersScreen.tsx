import { View, Text, ScrollView, Image } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { OrdersScreenNavigationProp } from '../types/navigation';
import useOrders from '../hooks/useOrders';
import { useNavigation } from '@react-navigation/native';
import ordersImg from '../assets/orders.jpg';
import { Button } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      //@ts-ignore
      tabBarLabel: ({ focused, color }) => (
        <Text
          className={`${focused ? 'text-primaryOrders' : color} text-[10px]`}
        >
          Orders
        </Text>
      ),
    });
  }, []);
  return (
    <ScrollView className="bg-primaryOrders">
      <Image source={ordersImg} className="h-64 w-full" />
      <View>
        <Button
          color={'pink'}
          onPress={() => setAscending((prev) => !prev)}
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
          }}
        >
          {ascending ? 'Showing: Older First' : 'Showing: Most Recent First'}
        </Button>
        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
