// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
// import {changeType, ResourceProvider, PetriNet} from 'netgrif-application-engine';
//
// export abstract class AbstractPetriNetJsonResourceService {
//
//     protected constructor(protected provider: ResourceProvider, protected SERVER_URL: string) {
//     }
//
//     /**
//      * Get All Using Petri Net
//      * GET
//      * {{baseUrl}}/api/petrinet
//      */
//     public getAll(): Observable<PetriNet> {
//         return this.provider.get$('petrinet', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Get Data Field References Using
//      * POST
//      * {{baseUrl}}/api/petrinet/data
//      */
//     public getDataPetriNet(body: object): Observable<PetriNet> {  // TODO: response
//         return this.provider.post$('petrinet/data', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
// }
//
//
// @Injectable({
//     providedIn: 'root'
// })
// export class PetriNetJsonResourceService extends AbstractPetriNetJsonResourceService {
//     constructor(provider: ResourceProvider) {
//         super(provider, 'http://localhost:8080/api/');
//     }
// }
