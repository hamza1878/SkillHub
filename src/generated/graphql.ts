import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AuthenticatedItem = User;

export type Company = {
  __typename?: 'Company';
  capital?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  foundingDate?: Maybe<Scalars['DateTime']['output']>;
  headquarters?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobDomain?: Maybe<Scalars['String']['output']>;
  legalStatus?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<ImageFieldOutput>;
  name?: Maybe<Scalars['String']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  revenue?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<CompanyTypeType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CompanyCreateInput = {
  capital?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  foundingDate?: InputMaybe<Scalars['DateTime']['input']>;
  headquarters?: InputMaybe<Scalars['String']['input']>;
  jobDomain?: InputMaybe<Scalars['String']['input']>;
  legalStatus?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  revenue?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CompanyTypeType>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CompanyOrderByInput = {
  capital?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  foundingDate?: InputMaybe<OrderDirection>;
  headquarters?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  jobDomain?: InputMaybe<OrderDirection>;
  legalStatus?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  registrationNumber?: InputMaybe<OrderDirection>;
  revenue?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CompanyRelateToOneForCreateInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  create?: InputMaybe<CompanyCreateInput>;
};

export type CompanyRelateToOneForUpdateInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  create?: InputMaybe<CompanyCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CompanyTypeType {
  Eurl = 'EURL',
  Sarl = 'SARL',
  Sas = 'SAS',
  Sasu = 'SASU'
}

export type CompanyTypeTypeNullableFilter = {
  equals?: InputMaybe<CompanyTypeType>;
  in?: InputMaybe<Array<CompanyTypeType>>;
  not?: InputMaybe<CompanyTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<CompanyTypeType>>;
};

export type CompanyUpdateArgs = {
  data: CompanyUpdateInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyUpdateInput = {
  capital?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  foundingDate?: InputMaybe<Scalars['DateTime']['input']>;
  headquarters?: InputMaybe<Scalars['String']['input']>;
  jobDomain?: InputMaybe<Scalars['String']['input']>;
  legalStatus?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<ImageFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  revenue?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<CompanyTypeType>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CompanyWhereInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>;
  NOT?: InputMaybe<Array<CompanyWhereInput>>;
  OR?: InputMaybe<Array<CompanyWhereInput>>;
  capital?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  foundingDate?: InputMaybe<DateTimeNullableFilter>;
  headquarters?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  jobDomain?: InputMaybe<StringFilter>;
  legalStatus?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  registrationNumber?: InputMaybe<StringFilter>;
  revenue?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<CompanyTypeTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CompanyWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type JobApplication = {
  __typename?: 'JobApplication';
  Company?: Maybe<Company>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  resume?: Maybe<Array<Resume>>;
  resumeCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<Array<User>>;
  userCount?: Maybe<Scalars['Int']['output']>;
};


export type JobApplicationResumeArgs = {
  cursor?: InputMaybe<ResumeWhereUniqueInput>;
  orderBy?: Array<ResumeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResumeWhereInput;
};


export type JobApplicationResumeCountArgs = {
  where?: ResumeWhereInput;
};


export type JobApplicationUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type JobApplicationUserCountArgs = {
  where?: UserWhereInput;
};

export type JobApplicationCreateInput = {
  Company?: InputMaybe<CompanyRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<ResumeRelateToManyForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type JobApplicationOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type JobApplicationUpdateArgs = {
  data: JobApplicationUpdateInput;
  where: JobApplicationWhereUniqueInput;
};

export type JobApplicationUpdateInput = {
  Company?: InputMaybe<CompanyRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  resume?: InputMaybe<ResumeRelateToManyForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type JobApplicationWhereInput = {
  AND?: InputMaybe<Array<JobApplicationWhereInput>>;
  Company?: InputMaybe<CompanyWhereInput>;
  NOT?: InputMaybe<Array<JobApplicationWhereInput>>;
  OR?: InputMaybe<Array<JobApplicationWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  resume?: InputMaybe<ResumeManyRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserManyRelationFilter>;
};

export type JobApplicationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCompanies?: Maybe<Array<Maybe<Company>>>;
  createCompany?: Maybe<Company>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createJobApplication?: Maybe<JobApplication>;
  createJobApplications?: Maybe<Array<Maybe<JobApplication>>>;
  createResume?: Maybe<Resume>;
  createResumes?: Maybe<Array<Maybe<Resume>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCompanies?: Maybe<Array<Maybe<Company>>>;
  deleteCompany?: Maybe<Company>;
  deleteJobApplication?: Maybe<JobApplication>;
  deleteJobApplications?: Maybe<Array<Maybe<JobApplication>>>;
  deleteResume?: Maybe<Resume>;
  deleteResumes?: Maybe<Array<Maybe<Resume>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  updateCompanies?: Maybe<Array<Maybe<Company>>>;
  updateCompany?: Maybe<Company>;
  updateJobApplication?: Maybe<JobApplication>;
  updateJobApplications?: Maybe<Array<Maybe<JobApplication>>>;
  updateResume?: Maybe<Resume>;
  updateResumes?: Maybe<Array<Maybe<Resume>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateCompaniesArgs = {
  data: Array<CompanyCreateInput>;
};


export type MutationCreateCompanyArgs = {
  data: CompanyCreateInput;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateJobApplicationArgs = {
  data: JobApplicationCreateInput;
};


export type MutationCreateJobApplicationsArgs = {
  data: Array<JobApplicationCreateInput>;
};


export type MutationCreateResumeArgs = {
  data: ResumeCreateInput;
};


export type MutationCreateResumesArgs = {
  data: Array<ResumeCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCompaniesArgs = {
  where: Array<CompanyWhereUniqueInput>;
};


export type MutationDeleteCompanyArgs = {
  where: CompanyWhereUniqueInput;
};


export type MutationDeleteJobApplicationArgs = {
  where: JobApplicationWhereUniqueInput;
};


export type MutationDeleteJobApplicationsArgs = {
  where: Array<JobApplicationWhereUniqueInput>;
};


export type MutationDeleteResumeArgs = {
  where: ResumeWhereUniqueInput;
};


export type MutationDeleteResumesArgs = {
  where: Array<ResumeWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateCompaniesArgs = {
  data: Array<CompanyUpdateArgs>;
};


export type MutationUpdateCompanyArgs = {
  data: CompanyUpdateInput;
  where: CompanyWhereUniqueInput;
};


export type MutationUpdateJobApplicationArgs = {
  data: JobApplicationUpdateInput;
  where: JobApplicationWhereUniqueInput;
};


export type MutationUpdateJobApplicationsArgs = {
  data: Array<JobApplicationUpdateArgs>;
};


export type MutationUpdateResumeArgs = {
  data: ResumeUpdateInput;
  where: ResumeWhereUniqueInput;
};


export type MutationUpdateResumesArgs = {
  data: Array<ResumeUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  companies?: Maybe<Array<Company>>;
  companiesCount?: Maybe<Scalars['Int']['output']>;
  company?: Maybe<Company>;
  jobApplication?: Maybe<JobApplication>;
  jobApplications?: Maybe<Array<JobApplication>>;
  jobApplicationsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  resume?: Maybe<Resume>;
  resumes?: Maybe<Array<Resume>>;
  resumesCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryCompaniesArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  orderBy?: Array<CompanyOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CompanyWhereInput;
};


export type QueryCompaniesCountArgs = {
  where?: CompanyWhereInput;
};


export type QueryCompanyArgs = {
  where: CompanyWhereUniqueInput;
};


export type QueryJobApplicationArgs = {
  where: JobApplicationWhereUniqueInput;
};


export type QueryJobApplicationsArgs = {
  cursor?: InputMaybe<JobApplicationWhereUniqueInput>;
  orderBy?: Array<JobApplicationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: JobApplicationWhereInput;
};


export type QueryJobApplicationsCountArgs = {
  where?: JobApplicationWhereInput;
};


export type QueryResumeArgs = {
  where: ResumeWhereUniqueInput;
};


export type QueryResumesArgs = {
  cursor?: InputMaybe<ResumeWhereUniqueInput>;
  orderBy?: Array<ResumeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResumeWhereInput;
};


export type QueryResumesCountArgs = {
  where?: ResumeWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Resume = {
  __typename?: 'Resume';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<Array<User>>;
  userCount?: Maybe<Scalars['Int']['output']>;
};


export type ResumeUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type ResumeUserCountArgs = {
  where?: UserWhereInput;
};

export type ResumeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type ResumeManyRelationFilter = {
  every?: InputMaybe<ResumeWhereInput>;
  none?: InputMaybe<ResumeWhereInput>;
  some?: InputMaybe<ResumeWhereInput>;
};

export type ResumeOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ResumeRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ResumeWhereUniqueInput>>;
  create?: InputMaybe<Array<ResumeCreateInput>>;
};

export type ResumeRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ResumeWhereUniqueInput>>;
  create?: InputMaybe<Array<ResumeCreateInput>>;
  disconnect?: InputMaybe<Array<ResumeWhereUniqueInput>>;
  set?: InputMaybe<Array<ResumeWhereUniqueInput>>;
};

export type ResumeUpdateArgs = {
  data: ResumeUpdateInput;
  where: ResumeWhereUniqueInput;
};

export type ResumeUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type ResumeWhereInput = {
  AND?: InputMaybe<Array<ResumeWhereInput>>;
  NOT?: InputMaybe<Array<ResumeWhereInput>>;
  OR?: InputMaybe<Array<ResumeWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserManyRelationFilter>;
};

export type ResumeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  picture?: Maybe<ImageFieldOutput>;
  role?: Maybe<UserRoleType>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
  role?: InputMaybe<UserRoleType>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export enum UserRoleType {
  Company = 'COMPANY',
  User = 'USER'
}

export type UserRoleTypeNullableFilter = {
  equals?: InputMaybe<UserRoleType>;
  in?: InputMaybe<Array<UserRoleType>>;
  not?: InputMaybe<UserRoleTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserRoleType>>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
  role?: InputMaybe<UserRoleType>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  role?: InputMaybe<UserRoleTypeNullableFilter>;
  status?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Unnamed_1_MutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


