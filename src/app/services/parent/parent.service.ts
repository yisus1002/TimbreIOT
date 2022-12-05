import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  public API_URL: string = 'https://aifik105nl.execute-api.us-east-1.amazonaws.com/';
  constructor() { }
}
