//  A class should be open for extension but closed for modification.
// This helps make code more maintainable and flexible

export interface StorageService {
  uploadFile: (path: string) => string;
  removeFile: (location: string) => boolean;
  getFile: (uri: string) => string;
}

export class AWSs3 implements StorageService {
  uploadFile(path: string): string {
    return path;
  }
  getFile(uri: string): string {
    return uri;
  }
  removeFile(location: string): boolean {
    if (location) {
      return true;
    }
    return false;
  }
}

export class LocalFileSystem implements StorageService {
  uploadFile(path: string): string {
    return path;
  }
  getFile(uri: string): string {
    return uri;
  }
  removeFile(location: string): boolean {
    if (location) {
      return true;
    }
    return false;
  }
}
