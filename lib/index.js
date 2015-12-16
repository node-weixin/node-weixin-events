var Emitter = require('events').EventEmitter;

var emitter = new Emitter();

export default {
  OAUTH_SUCCESS: 'oauth.success',
  ORDER_CREATE: 'order.create',
  ORDER_NOTIFY: 'order.notify',
  ACCESS_TOKEN_UPDATE: 'access.token.update',
  ACCESS_TOKEN_NOTIFY: 'access.token.notify',
  ACCESS_TOKEN_REFRESH: 'access.token.refresh',
  on: function(event, cb) {
    if (typeof event === 'string') {
      for (var k in this) {
        if (event === this[k]) {
          emitter.on(event, cb);
          return true;
        }
      }
    }
    return false;
  },
  emit: function(event, data) {
    if (typeof event === 'string' && data instanceof Array) {
      for (var k in this) {
        if (event === this[k]) {
          return emitter.emit.apply(emitter, [event].concat(data));
        }
      }
    }
    return false;
  }
};
