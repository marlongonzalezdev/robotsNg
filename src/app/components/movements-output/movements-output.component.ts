import {Component, Input, OnInit} from '@angular/core';
import {RobotMovement} from "../../models/robot-movement";
import {DeploymentResponse} from "../../models/deploymentResponse";
import {Orientation} from "../../models/orientation";
import {MatDialog} from "@angular/material/dialog";
import {RobotLostDialogComponent} from "../robot-lost-dialog/robot-lost-dialog.component";

@Component({
  selector: 'mr-movements-output',
  templateUrl: './movements-output.component.html',
  styleUrls: ['./movements-output.component.scss']
})
export class MovementsOutputComponent implements OnInit {
  @Input() movements: DeploymentResponse[] = [];
  @Input() width = 0;
  @Input() height = 0;
  marsSurface: { rows: number[]; cols: number[]; } = {rows: [], cols: []};
  currentStep = 0;
  currentRobot = 0;
  Orientation = Orientation;
  lostRobots = new Map<string, DeploymentResponse>();

  lastMovement: boolean = false;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeMarsSurface();
  }

  goBack(): void {
    this.lastMovement = false;
    if (this.currentStep === 0 && this.currentRobot === 0) {
      return;
    }
    if (this.currentStep > 0) {
      this.currentStep--;
    } else {
      this.currentRobot--;
      this.currentStep = this.movements[this.currentRobot].movements.length - 1;
    }
  }

  get getMovements() {
    return this.movements[this.currentRobot].movements.length;
  }

  goForward(): void {
    this.lastMovement = false;
    if (this.currentStep === this.movements[this.currentRobot].movements.length - 1) {
      if (this.currentRobot === this.movements.length - 1) {
        this.lastMovement = true;
        return;
      }
      if (this.movements[this.currentRobot].isLost) {
        const coords = this.movements[this.currentRobot].movements[this.currentStep].coordinates;
        this.lostRobots.set(`${coords.x},${coords.y}`, this.movements[this.currentRobot]);
        const dialogRef = this.dialog.open(RobotLostDialogComponent, {
          data: {
            movement: this.movements[this.currentRobot]
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.changeRobot();
        });
      } else {
        this.changeRobot();
      }
      return;
    }
    this.currentStep++;
  }

  locateRobotAt(step: number, posX: number, posY: number): RobotMovement | null {
    const robotMovements = this.movements[this.currentRobot];
    const movements = robotMovements.movements;
    const found = movements[step].coordinates.x === posX && this.movements[this.currentRobot].movements[step].coordinates.y === posY;
    return found ? robotMovements.movements[step] : null;
  }

  private changeRobot(): void {
    this.currentRobot++;
    this.currentStep = 0;
  }

  private initializeMarsSurface(): void {
    const rows = Array.from({length: this.height+1}, (_, i) => i).reverse();
    const cols = Array.from({length: this.width+1}, (_, i) => i);
    this.marsSurface = {rows, cols};
  }
}
