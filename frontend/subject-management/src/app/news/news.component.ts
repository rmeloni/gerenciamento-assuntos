import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from '../subject.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class NewsComponent {
  @Input() subject: Subject | null = null;
  @Output() closeEmitter = new EventEmitter<void>();

  selectedLink!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  showNews(link: string) {
    const itemNew = {
      id: this.subject?.id,
      title: this.subject?.title,
      url: link,
    };

    this.router.navigate(['relatednews'], { state: { data: itemNew } });
  }

  close() {
    this.closeEmitter.emit();
  }
}
