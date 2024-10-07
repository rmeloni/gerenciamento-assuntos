import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject.model';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss'
})

export class SubjectFormComponent implements OnChanges {
  @Input() subject: Subject | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  subjectForm: FormGroup;

  constructor(private fb: FormBuilder, private subjectService: SubjectService) {
    this.subjectForm = this.fb.group({
      title: ['', Validators.required],
      keywords: ['', Validators.required],
      status: ['Pendente'],
    });
  }

  ngOnChanges() {
    if (this.subject) {
      this.subjectForm.patchValue(this.subject);
    } else {
      this.subjectForm.reset({
        status: 'Pendente'
      });
    }
  }

  onSubmit() {
    const subject: Subject = this.subjectForm.value;

    if (this.subject) {
      subject.id = this.subject.id;
      this.subjectService.updateSubject(subject).subscribe(() => {
        this.subjectForm.reset();
        this.formSubmitted.emit();
        this.subject = null;
      });
    } else {
      this.subjectService.createSubject(subject).subscribe(() => {
        this.subjectForm.reset();
        this.formSubmitted.emit();
      });
    }
  }
}
