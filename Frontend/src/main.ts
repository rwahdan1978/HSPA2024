/* eslint-disable @typescript-eslint/no-unused-vars */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// import { registerLicense } from '@syncfusion/ej2-base';

// registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXxednVURWNfV011XUA=");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
