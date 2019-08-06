import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatCardModule,MatIconModule, MatMenuModule, MatButtonModule, MatAutocomplete } from "@angular/material";
import { SubStPipe } from './sub-st.pipe';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { BlockUIModule } from 'ng-block-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddQuantityComponent } from './add-quantity/add-quantity.component';
import { MatElementsModule } from 'src/app/mat-elements/mat-elements.module';
// import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [ProductListComponent, SubStPipe, AddProductComponent, ProductDetailsComponent, AddQuantityComponent],
  entryComponents:[AddProductComponent,ProductDetailsComponent,AddQuantityComponent],
  imports: [
    // ToastrModule.forRoot(),
    CommonModule,
    ProductRoutingModule,
    MatElementsModule,
        BlockUIModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
  ]
})
export class ProductModule { }
