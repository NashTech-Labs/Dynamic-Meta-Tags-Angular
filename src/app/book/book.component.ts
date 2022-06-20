import { Component, Optional } from '@angular/core';
import { MetadataService, PageMetadata } from '../service/meta-tags.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  constructor(
    @Optional() private metadataService: MetadataService,
  ) { 
    if (this.metadataService) this.metadataService.updateMetadata(this.getPageMetatags());
  }

  getPageMetatags() {
    
    const defaultMetadata: Partial<PageMetadata> = {
       title: "Welcome To Book Page"
    };
    defaultMetadata.image = '.assets/images/book.jpeg';
    defaultMetadata.description = "This is book Page for changing Meta tags Dynamically";
    return defaultMetadata;

  }

}
