import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject.model';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SubjectModalComponent } from '../subject-modal/subject-modal.component';
import { NewsComponent } from '../news/news.component';


@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, SubjectModalComponent, NewsComponent, DecimalPipe, FormsModule, NgbPaginationModule, NgbTypeaheadModule],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.subjects.length;

  selectedSubject: Subject | null = null;
  showModal: boolean = false;

  showDetailsModal: boolean = false;
  hoveredSubject: Subject | null = null;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data.map((subject, i) => ({ position: i + 1, ...subject })).slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
      this.collectionSize = data.length;
    });
  }

  updateStatus(subject: Subject) {
    this.subjectService.updateSubject(subject).subscribe(() => {
      this.loadSubjects();
    });
  }

  deleteSubject(id: string) {
    this.subjectService.deleteSubject(id).subscribe(() => {
      this.loadSubjects();
    });
  }

  editSubject(subject: Subject) {
    this.selectedSubject = subject;
    this.showModal = true;
  }

  openModal() {
    this.selectedSubject = null;
    this.showModal = true;
  }

  onFormSubmitted() {
    this.showModal = false;
    this.loadSubjects();
  }

  showDetails(subject: Subject) {

    const target = event?.target as HTMLElement;
    if (target.tagName !== 'SELECT' && target.tagName !== 'BUTTON') {
      this.hoveredSubject = subject;
      this.showDetailsModal = true;
    }
  }

  hideDetails() {
    this.showDetailsModal = false;
    this.hoveredSubject = null;
  }
}
