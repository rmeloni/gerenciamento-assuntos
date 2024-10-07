import { Component } from '@angular/core';
import { SubjectListComponent } from '../subject-list/subject-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SubjectListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
