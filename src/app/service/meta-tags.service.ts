import { Injectable } from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import {Router} from "@angular/router";

export interface PageMetadata {
  title: string;
  image: string;
  description: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'Home ',
  image: '',
  description: 'Welcome To Home',
  keywords: [],
  type: 'website',
};

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  hostUrl = '';

  constructor(private metaTagService: Meta,
              private titleService: Title,
              private router: Router) {
                this.hostUrl = window.location.host;
               }

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const pageMetadata: PageMetadata = {...defaultMetadata, ...metadata};
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);
    const updatedMetaTags = [
      ...metatags,
      { property: 'og:url', content: `${this.hostUrl}${this.router.url}`},
      { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    ]
      updatedMetaTags.forEach( meta =>{
        this.metaTagService.updateTag(meta);
      })

  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    let updatedMetadata = [];
    if(metadata.title){
      updatedMetadata.push({ name: 'title', content: metadata.title })
      updatedMetadata.push({ property: 'og:title', content: metadata.title })
    }
    if(metadata.description){
      updatedMetadata.push({ name: 'description', content: metadata.description })
      updatedMetadata.push({ property: 'og:description', content: metadata.description })
    }
    if(metadata.keywords){
      updatedMetadata.push({ name: 'keywords', content: metadata.keywords.join(', ') })
    }
    if(metadata.type){
      updatedMetadata.push({ property: 'og:type', content: metadata.type })
    }
    if(metadata.image){
      updatedMetadata.push({ property: 'og:image', content: metadata.image})
    }
    return updatedMetadata;
  }

}
