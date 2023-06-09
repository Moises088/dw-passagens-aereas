import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private _loading: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this._loading.setLoading(true, request.url);
        return next.handle(request)
            .pipe(catchError((err) => {
                this._loading.setLoading(false, request.url);
                return throwError(err);
            }))
            .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    this._loading.setLoading(false, request.url);
                }
                return evt;
            }));
    }
}

