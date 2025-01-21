import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private role: string | null = null;  

  getRole(): string | null {
    return this.role || localStorage.getItem('role');  
  }

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', role);  
  }

  clearRole(): void {
    this.role = null;
    localStorage.removeItem('role');
  }

}