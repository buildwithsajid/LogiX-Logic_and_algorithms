import { EventType } from './eventTypes.js';

/**
 * Maps algorithm operation events to corresponding Java line numbers and descriptions.
 */
export class SourceLineMapper {
  constructor(mapping = {}) {
    this.mapping = mapping;
  }

  /**
   * Retrieves the Java line number for a given event type or step identifier
   */
  getLineForEvent(eventType, stepId) {
    if (stepId && this.mapping[stepId]) {
      return this.mapping[stepId];
    }
    return this.mapping[eventType] || null;
  }
}
