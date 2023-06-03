import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { HomeRouting } from "./home.routing";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        HomeRouting
    ]
})
export class HomeModule {}
