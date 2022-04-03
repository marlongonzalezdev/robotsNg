import {RobotMovement} from "./robot-movement";

export interface DeploymentResponse {
  movements: RobotMovement[];
  isLost: boolean;
}
