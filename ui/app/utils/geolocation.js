import macaddress from 'node-macaddress';
import axios from 'axios';

export default async function getDeviceLocation() {
  const loc = await geolocate();
  return loc;
}

function geolocateTest() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        resolve(loc);
      },
      console.log,
      {
        enableHighAccuracy: true,
        timeout: 75000,
        maximumAge: 0
      }
    );
  });
}

function geolocate() {
  const address = macaddress.one((err, mac) => mac);

  return new Promise(resolve => {
    axios
      .post(
      'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCMQPbpLgidGrX_Z7iuB3D5EDbCbCQjkH8',
      {
        considerIp: 'true',
        wifiAccessPoints: [
          {
            macAddress: address
          }
        ]
      }
      )
      .then(res => resolve(res.data.location))
      .catch(console.log);
  });
}
