import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ORDERS } from '../graphql/queries';

function useCustomOrders(userid: string) {
  const { loading, data, error } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    // Sarebbe meglio creare delle classi per tenere i tipi graphQL dati anche i metodi
    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      carrier: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItems: value.trackingItems,
      Address: value.Address,
      City: value.City,
      Lat: value.Lat,
      Lng: value.Lng,
    }));

    const customerOrders = orders.filter(
      (order) => order.trackingItems.customer_id === userid
    );

    setOrders(customerOrders);
  }, [data, userid]);

  return { orders, loading, error };
}

export default useCustomOrders;
