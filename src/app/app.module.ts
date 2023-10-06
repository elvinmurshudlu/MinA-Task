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
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';
import {ChartService} from "./services/chart.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import { ModalPrimeComponent } from './components/modal-prime/modal-prime.component';
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    MapComponent,
    ChartComponent,
    ModalPrimeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxBootstrapMultiselectModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    ButtonModule,
    FileUploadModule,
    DialogModule

  ],
  providers: [MapService,ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
