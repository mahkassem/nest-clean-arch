export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function rad2deg(rad: number) {
  return rad * (180 / Math.PI);
}

export function randomGeo(center: number[], radius: number): object {
  const y0 = center[0];
  const x0 = center[1];
  const rd = radius / 111300;

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  return {
    latitude: y + y0,
    longitude: x + x0,
  };
}

export function boundingBox(lat: number, lon: number, radius: number) {
  const r = 6371; // earth's mean radius in km
  const maxLat = lat + rad2deg(radius / r);
  const minLat = lat - rad2deg(radius / r);
  const maxLon = lon + rad2deg(radius / r / Math.cos(deg2rad(lat)));
  const minLon = lon - rad2deg(radius / r / Math.cos(deg2rad(lat)));

  return {
    maxLat,
    minLat,
    maxLon,
    minLon,
  };
}

export function distanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export function GeoPointToLatLng(point: string): LatLng {
  // POINT(30.5234 50.4501) => [50.4501, 30.5234]
  console.log('point', point);
  const [lat, lng] = point
    .replace('POINT(', '')
    .replace(')', '')
    .split(' ')
    .map((v) => parseFloat(v));

  return {
    lat,
    lng,
  };
}

export interface LatLng {
  lat: number;
  lng: number;
}