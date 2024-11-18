import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, IconButton, MD3Theme, Text, useTheme} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {useUser} from '../providers/UserProvider';
import {fetch} from '@react-native-community/netinfo';
import {NavigationProp} from '@react-navigation/native';

const Home = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [connection, setConnection] = useState<any>(null);
  const theme = useTheme();
  const styles = createStyles(theme);
  const {user} = useUser();

  useEffect(() => {
    // getLocation();
    // getConnection();
  }, []);

  const getLocation = async () => {
    await Geolocation.getCurrentPosition(async position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
        setLoading(true);
      await axios
        .get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            format: 'jsonv2',
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            zoom: 18,
            addressdetails: 1,
          },
        })
        .then((response: any) =>
          setLocation({
            ...location,
            address: response.data.display_name,
          }),
        )
        .catch((error: any) => console.log(error));
      setLoading(false);
    });
  };

  const getConnection = async () => {
    fetch().then(state => {
      console.log(state);
      setConnection(state);
    });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, padding: 24, gap: 16}}>
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text variant="titleSmall">Username</Text>
            <Text style={{marginTop: 4}} variant="bodySmall">
              {`@${user?.username}`}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text variant="titleSmall">Nama</Text>
            <Text style={{marginTop: 4}} variant="bodySmall">
              {user?.name}
            </Text>
          </View>
          <View>
            <IconButton
              mode="contained"
              icon="dots-horizontal"
              size={24}
              onPress={() => navigation.navigate('profile')}
            />
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text variant="titleSmall">Lokasi Saya</Text>
        {location && (
          <>
            <Text variant="bodySmall">{location?.address}</Text>
            <Text
              style={{marginTop: 8, color: theme.colors.primary}}
              variant="bodySmall">{`${location?.latitude}, ${location?.longitude}`}</Text>
          </>
        )}
        <Button mode="contained" onPress={getLocation} loading={loading}>
          {location ? 'Perbarui Lokasi' : 'Cek Lokasi'}
        </Button>
      </View>
      <View style={styles.card}>
        <Text variant="titleSmall">Status Koneksi</Text>
        {connection && (
          <>
            <Text
              style={{
                marginTop: 4,
                color: connection?.isConnected ? 'green' : 'red',
              }}
              variant="bodySmall">
              {`${connection?.isConnected ? 'Terhubung' : 'Tidak Terhubung'} ${
                connection?.type
              }`}
            </Text>
            {connection?.type === 'wifi' && (
              <Text style={{color: theme.colors.primary}} variant="bodySmall">
                {`SSID: ${connection?.details?.ssid}`}
              </Text>
            )}
            {connection?.type === 'cellular' && (
              <>
                <Text style={{color: theme.colors.primary}} variant="bodySmall">
                  {`Tipe sinyal: ${connection?.details?.cellularGeneration}`}
                </Text>
                <Text style={{color: theme.colors.primary}} variant="bodySmall">
                  {`Provider: ${connection?.details?.carrier}`}
                </Text>
              </>
            )}
          </>
        )}
        <Button mode="contained" onPress={getConnection}>
          {connection ? 'Perbarui Status' : 'Cek Status'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default Home;

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      elevation: 4,
      backgroundColor: theme.colors.background,
      gap: 8,
    },
  });
