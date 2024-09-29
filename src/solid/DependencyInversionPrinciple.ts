// High-level modules should not depend on low-level modules,
// but both should depend on abstractions

import { AWSs3, StorageService } from "./OpenClosedPrinciple";

class SaveImageFile {
  public constructor(private storageService: StorageService) {}

  public saveImage() {
    this.storageService.uploadFile("main path/image");
  }
}

// client code
// pass AWSs3 instance is called DependencyInjection **************
new SaveImageFile(new AWSs3());
