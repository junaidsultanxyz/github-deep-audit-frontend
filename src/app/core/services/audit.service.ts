import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { AuditJobResponse, AuditRequest } from '../models/audit.models';
import { environment } from '../config/environment';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  startAudit(request: AuditRequest): Observable<AuditJobResponse> {
    return this.http
      .post<AuditJobResponse>(`${this.baseUrl}/audit`, request)
      .pipe(catchError(this.handleError));
  }

  pollAuditStatus(jobId: string): Observable<AuditJobResponse> {
    return this.http
      .get<AuditJobResponse>(`${this.baseUrl}/audit/${jobId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.status === 0) {
      message = 'Unable to connect to the server. Please check your connection.';
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }

    return throwError(() => new Error(message));
  }
}
