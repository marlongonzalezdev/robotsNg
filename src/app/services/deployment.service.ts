import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {DeploymentResponse} from "../models/deploymentResponse";
import {Deployment} from "../models/deployment";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {

  constructor(private http: HttpClient) {
  }

  deploy(deployment: Deployment): Observable<DeploymentResponse[]> {
    const url = environment.apiUrl;
    return this.http.post<DeploymentResponse[]>(url, deployment);
      // .pipe(
      //   catchError(this.handleError('addHero', hero))
      // );
  }
}
