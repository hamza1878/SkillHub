import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ResponseFormComponent } from '../response-form/response-form.component';
import { JobApplicationService } from '../../job-application.service';
import { Apollo, gql } from 'apollo-angular';
import { CvService } from '../../cv.service';
import { Subscription } from 'rxjs';

interface Candidate {
  name: string;
  position: string;
  date: string;
  status: string;
  etat: 'accepted' | 'rejected' | 'enatt';
}

interface JobApplicationResponse {
  jobApplication: {
    Company: { id: string };
    Nom: string;
    Poste: string;
    Statut: string;
    id: string;
  }[];
}

@Component({
  selector: 'app-bodycomp',
  templateUrl: './bodycomp.component.html',
  styleUrls: ['./bodycomp.component.css'],
  standalone: false,
})
export class BodycompComponent implements OnInit, OnDestroy {
  candidates: Candidate[] = [
    { name: 'Jean Dupont', position: 'Développeur Web', date: '2023-10-01', status: 'Nouveau', etat: 'accepted' },
    { name: 'Marie Martin', position: 'Designer Graphique', date: '2023-09-28', status: 'En revue', etat: 'enatt' },
  ];

  selectedCandidate: Candidate | null = null;
  res = true;
  applicationData: string = '';
  jobApplications: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  userId: string | null | undefined;

  private subscriptions: Subscription = new Subscription();

  @ViewChild(ResponseFormComponent) responseForm!: ResponseFormComponent;

  constructor(
    private jobApplicationService: JobApplicationService,
    private cvService: CvService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cvService.id$.subscribe({
        next: (id) => {
          this.userId = localStorage.getItem('current_user');
          console.log('User ID:', this.userId);
          if (this.userId) {
            this.fetchJobApplications(this.userId);
          }
        },
        error: (err) => {
          console.error('Error fetching CV service ID:', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchJobApplications(userId: string): void {
    const GET_JOB_APPLICATIONS = gql`
      query JobApplication($where: JobApplicationWhereUniqueInput!) {
        jobApplication(where: $where) {
          Company {
            id
          }
          Nom
          Poste
          Statut
          id
        }
      }
    `;
  
    this.loading = true;
  
    this.apollo
      .query<JobApplicationResponse>({
        query: GET_JOB_APPLICATIONS,
        variables: { where: { id: "cm69zdb660000f2x1sszqg03g" } },
      })
      .subscribe({
        next: (result) => {
          if (result.data && result.data.jobApplication) {
            const jobApplications = Array.isArray(result.data.jobApplication)
              ? result.data.jobApplication
              : [result.data.jobApplication];
  
            this.jobApplications = jobApplications.map((application) => ({
              Nom: application.Nom,
              Poste: application.Poste,
              Statut: application.Statut,
              ApplicationId: application.id,
            }));
          } else {
            this.jobApplications = [];
          }
          this.loading = false;
          console.log('Job Applications:', this.jobApplications);
        },
        error: (err) => {
          this.error = 'Unable to fetch job applications. Please try again later.';
          this.loading = false;
          console.error('GraphQL Error:', err);
        },
      });
  }
  


  showDetails(candidate: Candidate): void {
    this.selectedCandidate = candidate;
  }

  onApply(): void {
    if (!this.applicationData.trim()) {
      alert('Veuillez entrer les données de candidature.');
      return;
    }
    this.jobApplicationService.apply(this.applicationData.trim());
    this.applicationData = '';
  }

  checkCandidateStatus(candidate: Candidate): boolean {
    return candidate.etat === 'accepted';
  }

  respondToCandidate(): void {
    if (this.selectedCandidate && this.selectedCandidate.etat === 'accepted') {
      this.res = false;
    } else {
      this.res = true;
    }
  }
}