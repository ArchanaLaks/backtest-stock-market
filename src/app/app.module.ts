import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradingStatergyComponent } from './trading-statergy/trading-statergy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LegBuilderComponent } from './leg-builder/leg-builder.component';
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    TradingStatergyComponent,
    LegBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
