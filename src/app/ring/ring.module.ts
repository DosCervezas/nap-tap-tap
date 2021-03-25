import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RingComponent } from './ring.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  entryComponents: [RingComponent],
  declarations: [RingComponent],
  exports: [RingComponent],
})
export class RingComponentModule {}
