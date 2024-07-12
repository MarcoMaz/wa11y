/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

// Define Constructor type
type Constructor<T = LitElement> = new (...args: any[]) => T;

export const DynamicStyleMixin = <TBase extends Constructor>(superclass: TBase) => {
  class Mixed extends superclass {
    @property({ type: Object }) classMap: Record<string, string> = {};

    constructor(...args: any[]) {
      super(...args);
      if (!Object.prototype.hasOwnProperty.call(this, 'classMap')) {
        this.classMap = {}; // Set default value if not already defined
      }
    }

    requestUpdate(name: PropertyKey | undefined, oldValue: unknown) {
      if (name === 'classMap' && JSON.stringify(this.classMap) === JSON.stringify(oldValue)) {
        return;
      }
      super.requestUpdate(name, oldValue);
    }  

    applyClassMap(elementName: string): string | undefined {
      return this.classMap[elementName];
    }
  }

  return Mixed;
};
