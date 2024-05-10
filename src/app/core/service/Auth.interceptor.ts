import {Injectable} from "@angular/core";
import {
  HttpBackend,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private httpclient!: HttpClient;

  constructor(private authenticationService: AuthenticationService, private router: Router, private http: HttpClient, private handler: HttpBackend) {
    this.httpclient = new HttpClient(handler);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Token = this.authenticationService.getFromLocalStorage('accessToken');
    if (Token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + Token),
      });
      return next.handle(cloned).pipe(
        catchError(err => {
          if (err.status === 401) {
            let header = new HttpHeaders()
              .set("Authorization", "Bearer " + this.authenticationService.getFromLocalStorage('refreshToken'));
            return this.httpclient.get<string>("http://localhost:8080/authentication/refresh", {headers: header}).pipe(
              switchMap((resp: any) => {
                this.authenticationService.setToLocalStorage('accessToken', resp.accessToken);
                let cloned = req.clone({
                  headers: req.headers.set("Authorization", "Bearer " + this.authenticationService.getFromLocalStorage('accessToken'))
                });
                return next.handle(cloned);
              })
            );
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
