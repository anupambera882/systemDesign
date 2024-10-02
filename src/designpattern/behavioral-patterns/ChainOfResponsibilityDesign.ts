// design a logging system

abstract class LogProcessor {
  public static INFO = 1;
  public static DEBUG = 2;
  public static ERROR = 3;
  private nextLoggerProcessor: LogProcessor | null;

  public constructor(loggerProcessor: LogProcessor | null) {
    this.nextLoggerProcessor = loggerProcessor;
  }

  public log(logLevel: number, message: string): void {
    if (this.nextLoggerProcessor != null) {
      this.nextLoggerProcessor.log(logLevel, message);
    }
  }
}

class InfoLogProcessor extends LogProcessor {
  public constructor(nexLogProcessor: LogProcessor | null) {
    super(nexLogProcessor);
  }

  public log(logLevel: number, message: string): void {
    if (logLevel == InfoLogProcessor.INFO) {
      console.log("INFO: " + message);
    } else {
      super.log(logLevel, message);
    }
  }
}

class DebugLogProcessor extends LogProcessor {
  public constructor(nexLogProcessor: LogProcessor | null) {
    super(nexLogProcessor);
  }

  public log(logLevel: number, message: string): void {
    if (logLevel == DebugLogProcessor.INFO) {
      console.log("INFO: " + message);
    } else {
      super.log(logLevel, message);
    }
  }
}

class ErrorLogProcessor extends LogProcessor {
  public constructor(nexLogProcessor: LogProcessor | null) {
    super(nexLogProcessor);
  }

  public log(logLevel: number, message: string): void {
    if (logLevel == ErrorLogProcessor.INFO) {
      console.log("INFO: " + message);
    } else {
      super.log(logLevel, message);
    }
  }
}

export default class ChainOfResponsibilityDesign {
  main() {
    const logObject = new InfoLogProcessor(
      new DebugLogProcessor(new ErrorLogProcessor(null))
    );

    logObject.log(LogProcessor.ERROR, "exception happens");
    logObject.log(LogProcessor.DEBUG, "need to debug this ");
    logObject.log(LogProcessor.INFO, "just for info ");
  }
}
