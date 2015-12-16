import assert from 'assert';
import nodeWeixinEvents from '../lib';

describe('node-weixin-events', function () {
  it('should listen and emit events', function (done) {
    var events = [
      'OAUTH_SUCCESS', 'ORDER_CREATE', 'ORDER_NOTIFY', 'ACCESS_TOKEN_UPDATE', 'ACCESS_TOKEN_NOTIFY',
      'ACCESS_TOKEN_REFRESH'
    ];
    var cnt = 0;
    for (var i = 0; i < events.length; i++) {
      nodeWeixinEvents.on(events[i], (function (idx) {
        return function (v) {
          assert.equal(true, v === idx);
          cnt++;
          if (cnt === events.length) {
            done();
          }
        };
      })(i));
      nodeWeixinEvents.emit(events[i], [i]);
    }
  });
  it('should fail to listen events not defined', function () {
    assert.equal(false, nodeWeixinEvents.on('OAUTH_SUCCESS1', function () {
    }));
    assert.equal(false, nodeWeixinEvents.emit('OAUTH_SUCCESS1'));
  });
});
