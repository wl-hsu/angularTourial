import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../../Shared/Models/Job";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  getAllJobs(): Observable<Job[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', 'xxxxx');
    return this.http.get<Job[]>("URL for jobs", {
      headers: {'Ocp-Apim-Subscription-Key': 'xxxx'}
    });
  }
}
