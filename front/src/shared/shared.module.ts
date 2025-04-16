// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe], // Important: must export to make it available
  imports: [CommonModule]
})
export class SharedModule {}