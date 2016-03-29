/**
 * Catalog model events
 */

'use strict';

import {EventEmitter} from 'events';
var Catalog = require('./catalog.model');
var CatalogEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CatalogEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Catalog.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CatalogEvents.emit(event + ':' + doc._id, doc);
    CatalogEvents.emit(event, doc);
  }
}

export default CatalogEvents;
