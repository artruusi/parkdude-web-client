import { ParkingSpot } from './../store/types';

export const spotListToString = (spots: ParkingSpot[]): string => {
  let parkingSpotsSTR = spots.reduce(
    (acc: string, spot: ParkingSpot) => acc + spot.name + ', ',
    '',
  );
  // remove last ,
  parkingSpotsSTR = parkingSpotsSTR.slice(0, -1);
  parkingSpotsSTR = parkingSpotsSTR.slice(0, -1);
  return parkingSpotsSTR;
};
