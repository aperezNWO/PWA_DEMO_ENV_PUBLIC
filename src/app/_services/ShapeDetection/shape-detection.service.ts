import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeDetectionService {

  constructor() { 

  }
 
  detectShapes(image: HTMLImageElement): string[] {
    
    const shapes: string[] = [];    

        // Ensure OpenCV.js is loaded
        if (cv.getBuildInformation) {

          //console.log('cv is loaded ... ' + cv.getBuildInformation) 
          // Create a Mat from the image
          const src = cv.imread(image);
          const gray = new cv.Mat();
          const edges = new cv.Mat();
    
          // Convert to grayscale
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    
          // Apply Canny edge detector
          cv.Canny(gray, edges, 50, 150, 3, false);
    
          // Find contours
          const contours = new cv.MatVector();
          const hierarchy = new cv.Mat();
          cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    
          // Iterate over contours and classify shapes
          for (let i = 0; i < contours.size(); i++) {
            const contour = contours.get(i);
            const approx = new cv.Mat();
            const epsilon = 0.04 * cv.arcLength(contour, true);
            cv.approxPolyDP(contour, approx, epsilon, true);
    
            let shape = '';
            if (approx.rows === 3) {
              shape = '[Triángulo]';
            } else if (approx.rows === 4) {
              const rect = cv.boundingRect(approx);
              const aspectRatio = rect.width / rect.height;
              shape = aspectRatio >= 0.95 && aspectRatio <= 1.05 ? '[Cuadrado]' : '[Rectángulo]';
            } else if (approx.rows > 4) {
              shape = '[Círculo]';
            }
    
            if (shape) {
              shapes.push(shape);
            }
          }
    
          // Release resources
          src.delete();
          gray.delete();
          edges.delete();
          contours.delete();
          hierarchy.delete();
    
          return shapes;
        } else 
        {
           //console.log('cv missing');
        }
    //};
    return shapes;    
  }
}
