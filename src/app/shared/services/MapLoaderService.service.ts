import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MapLoaderService {
  private loaded = false;

  load(apiKey: string, libraries: string[] = ['places']): Promise<void> {
    return new Promise((resolve, reject) => {
      // if (this.loaded) {
      //   console.log('[GoogleMapsLoader] Already loaded, resolving...');
      //   resolve();
      //   return;
      // }

      // if ((window as any).google?.maps) {
      //   console.log('[GoogleMapsLoader] Google Maps object already available.');
      //   this.loaded = true;
      //   resolve();
      //   return;
      // }

      console.log('[GoogleMapsLoader] Injecting Google Maps script...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('[GoogleMapsLoader] Script loaded.');
        if ((window as any).google?.maps) {
          console.log('[GoogleMapsLoader] google.maps is available.');
          this.loaded = true;
          resolve();
        } else {
          console.error('[GoogleMapsLoader] Script loaded, but google.maps is still undefined.');
          reject(new Error('google.maps not available after script load.'));
        }
      };

      script.onerror = (err) => {
        console.error('[GoogleMapsLoader] Failed to load script.', err);
        reject(new Error('Google Maps script failed to load.'));
      };

      document.head.appendChild(script);
    });
  }

}