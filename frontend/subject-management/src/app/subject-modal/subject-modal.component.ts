import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from '../subject.model';
import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-modal',
  standalone: true,
  imports: [CommonModule, SubjectFormComponent],
  templateUrl: './subject-modal.component.html',
  styleUrl: './subject-modal.component.scss'
})
export class SubjectModalComponent {
  @Input() subject: Subject | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  onFormSubmitted() {
    this.formSubmitted.emit();
  }
}
