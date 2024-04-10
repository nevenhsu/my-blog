import { getDistortion } from './distortions'

export const options = {
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 30,

  nPairs: 50, // deprecated
  length: 400,
  width: 20,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,

  fov: 90,
  fovSpeedUp: 150,
  speedUp: 3,
  carLightsFade: 0.5,

  // Percentage of the lane's width
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,

  /**  --------------------------------------
  These ones have to be arrays of [min,max].
  ------------------------------------------- */
  lightStickWidth: [0.02, 0.05],
  lightStickHeight: [0.3, 0.7],

  movingAwaySpeed: [20, 50],
  movingCloserSpeed: [-150, -230],

  /**  --------------------------------------
  Anything below can be either a number or an array of [min,max]
  ------------------------------------------- */

  // How drunk the driver is.
  // carWidthPercentage's max + carShiftX's max -> Cannot go over 1.
  // Or cars start going into other lanes
  carShiftX: [-0.5, 0.5],
  carLightsLength: [400 * 0.05, 400 * 0.2], // Length of the lights. Best to be less than total length
  carLightsRadius: [0.03, 0.1], // Radius of the tubes
  carWidthPercentage: [0.1, 0.5], // Width is percentage of a lane. Numbers from 0 to 1
  carFloorSeparation: [0, 0.2], // Self Explanatory

  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    /***  Only these colors can be an array ***/
    leftCars: [
      [0x1b5dd8, 0x5da4de, 0xabe2e8],
      [0x7d0d1b, 0xa90519, 0xff102a],
    ],
    rightCars: [
      [0xf2e8ce, 0xe6dcb1, 0xdecf8a],
      [0xf1eece, 0xe6e2b1, 0xdfd98a],
    ],
    sticks: [0xe2d6b4],
  },

  distortion: getDistortion('xyDistortion'),
}
