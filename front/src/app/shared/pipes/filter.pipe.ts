import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, field?: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      const value = field ? item[field] : item;
      return JSON.stringify(value).toLowerCase().includes(searchTerm);
    });
  }
}