import {Component, OnInit} from '@angular/core';
import {Deployment} from "./models/deployment";
import {DeploymentResponse} from "./models/deploymentResponse";
import {DeploymentService} from "./services/deployment.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showOutput: boolean = false;
  movements: DeploymentResponse[] = [];
  marsHeight = 0;
  marsWidth = 0;

  constructor(private  deploymentService: DeploymentService) {
  }

  ngOnInit(): void {
  }

  deploy(deployment: Deployment) {
    this.deploymentService.deploy(deployment).subscribe(result=> {
      this.movements = result;
      this.showOutput = true;
    });
    this.marsHeight = deployment.upRightCoordinates.y;
    this.marsWidth = deployment.upRightCoordinates.x;
  }
}
