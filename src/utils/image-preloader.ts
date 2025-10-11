/**
 * Utility for preloading images with proper cleanup
 */
export class ImagePreloader {
  private static instances: Map<string, ImagePreloader> = new Map();
  private static pendingLoads: Map<string, Promise<HTMLImageElement>> = new Map();

  private constructor() {}

  /**
   * Preload an image and return a promise that resolves when loaded
   */
  static preloadImage(src: string): Promise<HTMLImageElement> {
    // Return existing promise if already loading
    if (this.pendingLoads.has(src)) {
      return this.pendingLoads.get(src)!;
    }

    // Create new preload promise
    const preloadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.pendingLoads.delete(src);
        resolve(img);
      };
      
      img.onerror = (error) => {
        this.pendingLoads.delete(src);
        reject(new Error(`Failed to preload image: ${src}. ${error}`));
      };
      
      img.src = src;
    });

    this.pendingLoads.set(src, preloadPromise);
    return preloadPromise;
  }

  /**
   * Preload multiple images
   */
  static preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
    const promises = sources.map(src => this.preloadImage(src));
    return Promise.all(promises);
  }

  /**
   * Clear all cached preloaders
   */
  static clear(): void {
    this.instances.clear();
    this.pendingLoads.clear();
  }
}