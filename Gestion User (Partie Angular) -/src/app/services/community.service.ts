import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private genericService: GenericService) {
    this.genericService.setApiUrl('communities');
  }

  createCommunity(community: any): Observable<any> {
    return this.genericService.createEntity(community);
  }

  getAllCommunities(): Observable<any[]> {
    return this.genericService.getAllEntities();
  }

  getCommunityById(id: number): Observable<any> {
    return this.genericService.getEntityById(id);
  }

  updateCommunity(id: number, community: any): Observable<any> {
    return this.genericService.updateEntity(id, community);
  }

  deleteCommunity(id: number): Observable<any> {
    return this.genericService.deleteEntity(id);
  }
}
