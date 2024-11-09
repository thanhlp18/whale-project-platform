export abstract class ProcessorFactor<KEY, PROCESSOR> {

  constructor(protected readonly getter: (key: KEY) => PROCESSOR) { }

  getProcessor(key: KEY): PROCESSOR {
    return this.getter(key);
  }

}