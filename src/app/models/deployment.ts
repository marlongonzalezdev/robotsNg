import {Orientation} from "./orientation";

export interface Deployment {
  upRightCoordinates: {
    x: number;
    y: number;
  };
  deployments: Array<{
    coordinates: {
      x: number;
      y: number;
    };
    orientation: Orientation;
    instructions: string;
  }>
}
