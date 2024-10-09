abstract class StudentBuilder {
  public rollNumber: number | undefined = undefined;
  public age: number | undefined = undefined;
  public name: string = "";
  public fatherName: string = "";
  public motherName: string = "";
  public subjects: string[] = [];

  public setRollNumber(rollNumber: number): StudentBuilder {
    this.rollNumber = rollNumber;
    return this;
  }

  public setAge(age: number): StudentBuilder {
    this.age = age;
    return this;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setFatherName(fatherName: string) {
    this.fatherName = fatherName;
    return this;
  }

  public setMotherName(motherName: string) {
    this.motherName = motherName;
    return this;
  }

  public abstract setSubjects(): StudentBuilder;

  public build() {
    return new Student(this);
  }
}

class Student {
  rollNumber: number;
  age: number;
  name: string;
  fatherName: string;
  motherName: string;
  subjects: string[];

  public constructor(builder: StudentBuilder) {
    this.rollNumber = builder.rollNumber as number;
    this.age = builder.age as number;
    this.name = builder.name;
    this.fatherName = builder.fatherName;
    this.motherName = builder.motherName;
    this.subjects = builder.subjects;
  }

  public toString(): string {
    return (
      "" +
      " roll number: " +
      this.rollNumber +
      " age: " +
      this.age +
      " name: " +
      this.name +
      " father name: " +
      this.fatherName +
      " mother name: " +
      this.motherName +
      " subjects: " +
      this.subjects[0] +
      "," +
      this.subjects[1] +
      "," +
      this.subjects[2]
    );
  }
}

class EngineeringStudentBuilder extends StudentBuilder {
  public setSubjects(): StudentBuilder {
    const subs: string[] = [];
    subs.push("DSA");
    subs.push("OS");
    subs.push("Computer Architecture");
    this.subjects = subs;
    return this;
  }
}

class MBAStudentBuilder extends StudentBuilder {
  public setSubjects(): StudentBuilder {
    const subs: string[] = [];
    subs.push("Micro Economics");
    subs.push("Business Studies");
    subs.push("Operations Management");
    this.subjects = subs;
    return this;
  }
}

class Director {
  studentBuilder: StudentBuilder;

  constructor(studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
  }

  public createStudent(): Student {
    if (this.studentBuilder instanceof EngineeringStudentBuilder) {
      return this.createEngineeringStudent();
    } else {
      return this.createMBAStudent();
    }
  }

  private createEngineeringStudent(): Student {
    return this.studentBuilder
      .setRollNumber(1)
      .setAge(22)
      .setName("sj")
      .setSubjects()
      .build();
  }

  private createMBAStudent(): Student {
    return this.studentBuilder
      .setRollNumber(2)
      .setAge(24)
      .setName("sj")
      .setFatherName("MyFatherName")
      .setMotherName("MyMotherName")
      .setSubjects()
      .build();
  }
}

// client code
const directorObj1 = new Director(new EngineeringStudentBuilder());
const directorObj2 = new Director(new MBAStudentBuilder());

const engineerStudent = directorObj1.createStudent();
const mbaStudent = directorObj2.createStudent();

console.log(engineerStudent.toString());
console.log(mbaStudent.toString());
