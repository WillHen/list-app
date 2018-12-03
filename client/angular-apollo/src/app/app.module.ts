import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { AppComponent } from "./app.component";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AppComponent, ListComponent],
  imports: [BrowserModule, HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4040/graphql" }),
      cache: new InMemoryCache()
    });
  }
}
