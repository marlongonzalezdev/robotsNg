import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Orientation} from "../../models/orientation";
import {Deployment} from "../../models/deployment";

@Component({
  selector: 'mr-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  @Output() onDeployment = new EventEmitter<Deployment>();
  form: FormGroup = this.fb.group({
    upRightCoordinates: this.fb.group({
      x: this.fb.control(5, [Validators.required, Validators.max(50), Validators.pattern("^[0-9]*$")]),
      y: this.fb.control(3, [Validators.required, Validators.max(50), Validators.pattern("^[0-9]*$")])
    }),
    deployments: this.fb.array([]),
  });
  orientations = Orientation;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  get deployments() {
    return this.form.controls["deployments"] as FormArray;
  }

  addDeployment() {
    const {x,y} = this.form.controls['upRightCoordinates'].value;
    const deployment = this.fb.group({
      coordinates: this.fb.group({
        x: this.fb.control(0, [Validators.required, Validators.pattern("^[0-9]*$"),  Validators.max(x)]),
        y: this.fb.control(0, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(y)])
      }),
      orientation: this.fb.control(Orientation.NORTH, Validators.required),
      instructions: this.fb.control('', [Validators.required, Validators.minLength(1), Validators.pattern('^(L|R|F)+$')])
    });
    this.deployments.push(deployment);
  }

  removeDeployment(index: number): void {
    this.deployments.removeAt(index);
  }

  deploy() {
    this.onDeployment.emit(this.form.value);
  }
}
