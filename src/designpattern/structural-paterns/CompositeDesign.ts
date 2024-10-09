interface FileSystem {
  ls(): void;
}

class File implements FileSystem {
  public constructor(private name: string) {}

  public ls() {
    console.log("file name " + this.name);
  }
}

class Directory implements FileSystem {
  fileSystemList: FileSystem[];

  public constructor(private directoryName: string) {
    this.fileSystemList = [];
  }

  public add(fileSystemObj: FileSystem) {
    this.fileSystemList.push(fileSystemObj);
  }

  public ls() {
    console.log("Directory name " + this.directoryName);

    for (const fileSystemObj of this.fileSystemList) {
      fileSystemObj.ls();
    }
  }
}

export default class CompositeDesignPattern {
  public static main() {
    const movieDirectory = new Directory("Movie");
    const border = new File("Border");
    movieDirectory.add(border);
    const comedyMovieDirectory = new Directory("ComedyMovie");
    const netflix = new File("netflix");
    comedyMovieDirectory.add(netflix);
    movieDirectory.add(comedyMovieDirectory);
    movieDirectory.ls();
  }
}

CompositeDesignPattern.main();
