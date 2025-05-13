import {Injectable} from '@angular/core';
import {IdentityService} from '../../identity/services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class ActorComparatorService {

  constructor(private _identityService: IdentityService) { }

  public compareActors(actorId: string): boolean {
      const loggedIdentity = this._identityService.identity;
      return actorId === loggedIdentity.activeActorId;
  }
}
