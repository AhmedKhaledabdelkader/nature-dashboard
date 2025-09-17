import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader_service = inject(LoaderService);

  loader_service.show();
  return next(req).pipe(
    finalize(() => {

      setTimeout(()=>{loader_service.hide()},1000)
      
    
    })
  );
};
