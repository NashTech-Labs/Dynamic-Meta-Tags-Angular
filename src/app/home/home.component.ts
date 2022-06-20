import { Component, OnInit, Optional } from '@angular/core';
import { MetadataService, PageMetadata } from '../service/meta-tags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    @Optional() private metadataService: MetadataService,
  ) { 
    if (this.metadataService) this.metadataService.updateMetadata(this.getPageMetatags());
  }

  getPageMetatags() {
    
    const defaultMetadata: Partial<PageMetadata> = {
       title: "Welcome To Home Page"
    };
    defaultMetadata.image = '.assets/images/download.jpeg';
    defaultMetadata.description = "This is home Page for changing Meta tags Dynamically";
    return defaultMetadata;

  }

}
