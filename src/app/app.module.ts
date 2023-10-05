import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxBootstrapMultiselectModule} from "ngx-bootstrap-multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MapComponent } from './components/map/map.component';
import {MapService} from "./services/map.service";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgxBootstrapMultiselectModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
