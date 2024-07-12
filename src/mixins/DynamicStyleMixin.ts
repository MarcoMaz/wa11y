/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

// Define a type for class constructors that extend LitElement
type Constructor<T = LitElement> = new (...args: any[]) => T;

// Define an interface for the mixin's requirements
export interface DynamicStyleMixinInterface {
  classMap: Record<string, string>;
  applyClassMap(elementName: string): string | undefined;
}

export const DynamicStyleMixin = <TBase extends Constructor>(
  superclass: TBase
) => {
    // Define a new class that extends the provided superclass and implements the mixin interface
  class Mixed extends superclass implements DynamicStyleMixinInterface {
    @property({ type: Object }) classMap: Record<string, string> = {};

    constructor(...args: any[]) {
      super(...args);
      // Initialize classMap if not already defined in the instance
      if (!Object.prototype.hasOwnProperty.call(this, 'classMap')) {
        this.classMap = {};
      }
    }

    // Override requestUpdate to avoid unnecessary updates when classMap remains unchanged
    requestUpdate(name: PropertyKey | undefined, oldValue: unknown) {
      if (
        name === 'classMap' &&
        JSON.stringify(this.classMap) === JSON.stringify(oldValue)
      ) {
        return; // Skip update if classMap has not changed
      }
      super.requestUpdate(name, oldValue); // Call superclass method for update
    }

    // Method to apply class from classMap based on elementName
    applyClassMap(elementName: string): string | undefined {
      return this.classMap[elementName]; // Return the class corresponding to elementName
    }
  }

  // Return the Mixed class as both the extended superclass type and the mixin interface type
  return Mixed as TBase & Constructor<DynamicStyleMixinInterface>;
};
