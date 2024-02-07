import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property>{

constructor(private router: Router, private housingService: HousingService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):

  Observable<Property>|Property {
    
    const propId = route.params['id'];
    return (this.housingService.getProperty(+propId).pipe(
      catchError(error => {
          this.router.navigate(['/'])
          return of(null);
      })
    ) as any)

  }

}