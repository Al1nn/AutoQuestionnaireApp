/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
    standalone: false,
})
export class BreadcrumbComponent implements OnInit {

    breadcrumbs$!: Observable<Array<{ label: string; url: string; }>>;
    showBreadcrumb: boolean = true;
    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit() {
        this.breadcrumbs$ = this.breadcrumbService.getBreadcrumbs();
        this.breadcrumbs$.subscribe(breadcrumbs => {
            this.showBreadcrumb = breadcrumbs.every(breadcrumb => breadcrumb.label !== null);
        });
    }

    getBreadcrumbColor(label: string, isActive = false): string {
    switch (label) {
      case 'Legislation':
        return isActive ? 'bg-red-600 text-white' : 'bg-red-200 text-red-800 hover:bg-red-300';
      case 'Road Signs':
        return isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300';
      case 'Questionnaires':
        return isActive ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800 hover:bg-green-300';
      default:
        return isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  }


}
