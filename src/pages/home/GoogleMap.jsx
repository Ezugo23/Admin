import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { io } from 'socket.io-client';

const states = {
  Abia: { lat: 5.532003, lng: 7.486002 },
  Delta: { lat: 5.7048, lng: 6.1361 },
  Kaduna: { lat: 10.5105, lng: 7.4165 },
  Kano: { lat: 12.0022, lng: 8.5919 },
  Katsina: { lat: 12.9843, lng: 7.6174 },
  Kwara: { lat: 8.9669, lng: 4.4248 },
  Lagos: { lat: 6.5244, lng: 3.3792 },
  Rivers: { lat: 4.8156, lng: 7.0498 },
};

const GoogleMapComponent = () => {
  const [map, setMap] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [directions, setDirections] = useState([]);
  const [center, setCenter] = useState({ lat: 9.082, lng: 8.6753 });
  const [selectedState, setSelectedState] = useState('');

  const mapStyles = {
    height: '900px',
    width: '100%',
  };

  const shopIcon = {
    url: 'https://maps.google.com/mapfiles/kml/shapes/shopping.png',
    scaledSize: window.google ? new window.google.maps.Size(20, 20) : undefined,
  };

  const carIcon = {
    url: 'https://maps.google.com/mapfiles/kml/shapes/cabs.png',
    scaledSize: window.google ? new window.google.maps.Size(20, 20) : undefined,
  };

  const humanIcon = {
    url: 'https://maps.google.com/mapfiles/kml/shapes/man.png',
    scaledSize: window.google ? new window.google.maps.Size(20, 20) : undefined,
  };

  useEffect(() => {
    const socket = io('wss://delivery-chimelu-new.onrender.com');

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('driverLocationUpdate', (data) => {
      console.log('Driver location update received:', data);

      setDrivers((prevDrivers) => {
        const updatedDrivers = prevDrivers.filter(
          (driver) => driver.driverId !== data.driverId
        );
        updatedDrivers.push(data);
        console.log('Updated drivers:', updatedDrivers);
        return updatedDrivers;
      });
    });

    return () => {
      socket.close();
      console.log('Socket connection closed');
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'https://delivery-chimelu-new.onrender.com/api/v1/orders/'
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const onMarkerClick = (markerPosition) => {
    if (map && center) {
      map.panTo(markerPosition);
      map.setZoom(16);
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCenter(states[state]);
  };

  useEffect(() => {
    const fetchDirections = async () => {
      if (!window.google) return;

      const DirectionsService = new window.google.maps.DirectionsService();

      orders.forEach((order) => {
        if (
          (order.orderStatus === 'PENDING' ||
            order.orderStatus === 'CONFIRMED') &&
          order.deliveryAddress &&
          order.restaurantId
        ) {
          const origin = {
            lat: order.restaurantId.latitude,
            lng: order.restaurantId.longitude,
          };
          const destination = {
            lat: order.deliveryAddress.latitude,
            lng: order.deliveryAddress.longitude,
          };

          DirectionsService.route(
            {
              origin,
              destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections((prevDirections) => [
                  ...prevDirections,
                  { orderId: order._id, result },
                ]);
              } else {
                console.error(`Error fetching directions: ${result}`);
              }
            }
          );
        }
      });
    };

    fetchDirections();
  }, [orders]);

  const renderOrderMarkers = () => {
    return orders
      .filter((order) => order.orderStatus !== 'DELIVERED')
      .map((order) => {
        const { deliveryAddress, restaurantId, _id } = order;

        const markers = [];

        if (
          deliveryAddress &&
          typeof deliveryAddress.latitude === 'number' &&
          typeof deliveryAddress.longitude === 'number'
        ) {
          markers.push(
            <Marker
              key={`delivery-${_id}`}
              position={{
                lat: deliveryAddress.latitude,
                lng: deliveryAddress.longitude,
              }}
              title={`Order ID: ${order.orderId}`}
              icon={humanIcon}
            />
          );
        }

        if (
          restaurantId &&
          typeof restaurantId.latitude === 'number' &&
          typeof restaurantId.longitude === 'number'
        ) {
          markers.push(
            <Marker
              key={`restaurant-${_id}`}
              position={{
                lat: restaurantId.latitude,
                lng: restaurantId.longitude,
              }}
              title={`Restaurant: ${restaurantId.restaurantName}`}
              icon={shopIcon}
              onClick={() =>
                onMarkerClick({
                  lat: restaurantId.latitude,
                  lng: restaurantId.longitude,
                })
              }
            />
          );
        }

        return markers;
      });
  };

  const apiKey = 'AIzaSyDE83Koe2R_WZ1oOAt5SDicYKUBcBFLwy0';

  return (
    <div style={{ width: '700px' }}>
      <div>
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select a State</option>
          {Object.keys(states).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={6}
          center={center}
          onLoad={onLoad}
          options={{
            restriction: {
              latLngBounds: {
                north: 13.892,
                south: 4.2722,
                east: 14.6779,
                west: 2.6769,
              },
              strictBounds: true,
            },
            minZoom: 6,
            maxZoom: 15,
          }}
        >
          {drivers.map((driver) => (
            <Marker
              key={driver.driverId}
              position={{ lat: driver.latitude, lng: driver.longitude }}
              icon={carIcon}
            />
          ))}
          {renderOrderMarkers()}
          {directions.map((direction, index) => (
            <DirectionsRenderer
              key={index}
              directions={direction.result}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                },
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
