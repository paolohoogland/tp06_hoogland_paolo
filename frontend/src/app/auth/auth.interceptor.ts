import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the token from localStorage
        const token = localStorage.getItem('accessToken');

        // Clone the request and add the Authorization header
        const clonedRequest = token
            ? req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            })
            : req;

        // Pass the cloned request to the next handler
        return next.handle(clonedRequest);
    }
}
