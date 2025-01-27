//  import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
//  import { HttpLink } from 'apollo-angular/http';
//  import { NgModule } from '@angular/core';
//  import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
//  import createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';
//  import  isExtractableFile from 'extract-files/isExtractableFile.mjs';

//  const uri = 'http://localhost:3000/api/graphql'; 
//  export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//    return {
//      link: createUploadLink({
//        uri,
//        isExtractableFile:isExtractableFile
//      }),
//      cache: new InMemoryCache(),

//    };
//  }

//  @NgModule({
//    exports: [ApolloModule],
//    providers: [
//      {
//        provide: APOLLO_OPTIONS,
//        useFactory: createApollo,
//        deps: [HttpLink],
//      },
//    ],
//  })
//  export class GraphQLModule {}
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:3000/api/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri, }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}