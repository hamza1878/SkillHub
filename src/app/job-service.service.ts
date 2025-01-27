import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private apollo: Apollo) {}

  getJobs(where: any, companyWhere2: any) {
    return this.apollo.watchQuery({
      query: gql`
        query GetJobs($where: JobApplicationWhereUniqueInput!, $companyWhere2: CompanyWhereInput!) {
          jobApplication(where: $where) {
            Company(where: $companyWhere2) {
              name
              jobDomain
              businessModel
              IndustryType
              linkdein
              mission
            }
          }
        }
      `,
      variables: {
        where,
        companyWhere2,
      },
    }).valueChanges;
  }
}