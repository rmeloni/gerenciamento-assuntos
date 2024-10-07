import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from '../subject.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) { }

  showNews(link: string) {
    console.log(link)
    this.selectedLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  close() {
    this.closeEmitter.emit();
  }
}
