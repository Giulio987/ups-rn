import { View, Text } from 'react-native';
import React from 'react';
import { Card, Divider, Icon } from '@rneui/themed';
import colors from '../constants/colors';
import MapView, { Marker } from 'react-native-maps';

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card
      containerStyle={[
        {
          borderRadius: fullWidth ? 0 : 8,
          marginVertical: 8,
          padding: 0,
          paddingTop: 16,
          backgroundColor: fullWidth
            ? colors.primaryOrders
            : colors.primaryCustomers,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        fullWidth && { marginHorizontal: 0 },
      ]}
    >
      <View style={fullWidth && { height: '100%' }}>
        <Icon name="box" type="entypo" color="white" size={50} />
        <View className="items-start p-5 -mt-3">
          <View className="mx-auto">
            <Text className="text-sm text-center uppercase text-white font-bold">
              {order.carrier} - {order.trackingId}
            </Text>
            <Text className="text-white text-center text-lg font-bold">
              Expected Delivery:{' '}
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="white" />
          </View>
          <View className="mx-auto pb-5">
            <Text className="text-center text-white font-bold mt-5">
              Address
            </Text>
            <Text className="text-sm text-center text-white">
              {order.Address}, {order.City}
            </Text>
            <Text className="text-sm text-center italic text-white">
              Shipping Cost: ${order.shippingCost}
            </Text>
          </View>
        </View>

        <Divider color="white" />
        <View className="p-5">
          {order.trackingItems.items.map((item) => (
            <View
              className="flex-row justify-between items-center"
              key={item.item_id}
            >
              <Text className="text-sm italic text-white">{item.name}</Text>
              <Text className="text-white text-xl">x {item.quantity}</Text>
            </View>
          ))}
        </View>
        {/* MAP */}
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[
            { width: '100%', flexGrow: 1 },
            !fullWidth && { height: 200 },
          ]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
              }}
              title={'Delivery Location'}
              identifier="destination"
              description={order.Address}
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
