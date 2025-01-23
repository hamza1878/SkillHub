import { gql } from 'apollo-angular';

export const GET_CV_DATA = gql`
mutation CreateResume($data: ResumeCreateInput!) {
  createResume(data: $data) {
    id
    userCount
    firstName
    lastName
    email
    phone
    profilePicture
    linkedin
    github
    institution
    degree
    specialization
    startEdu
    endEdu
    location
    certificationName
    issuingOrganization
    year
    url
    projectTitle
    description
    role
    linkcertficat
    technologies
    company
    jobTitle
    startDate
    endDate
    descrip
    skills
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_CV_DATA = gql`
  mutation UpdateCvData($cvData: CvInput!) {
    updateCv(cvData: $cvData) {
      success
      message
    }
  }
`;
