import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-related-news',
  standalone: true,
  imports: [],
  templateUrl: './related-news.component.html',
  styleUrl: './related-news.component.scss'
})
export class RelatedNewsComponent implements OnInit {
  selectedLink!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.selectedLink = this.sanitizer.bypassSecurityTrustResourceUrl(history.state.data.url);
  }

  goBack() {
    this.location.back();
  }
}
