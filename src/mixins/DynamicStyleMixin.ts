/* eslint-disable @typescript-eslint/no-explicit-any */
type Constructor<T = object> = new (...args: any[]) => T;

type ClassMap = Record<string, string>;

export const DynamicStyleMixin = <TBase extends Constructor>(superclass: TBase) => {
  class Mixed extends superclass {
    classMap: ClassMap;

    constructor(...args: any[]) {
      super(...args);
      this.classMap = {};
    }

    applyClassMap(elementName: string): string | undefined {
      return this.classMap[elementName];
    }
  }

  return Mixed;
};
