import assert from 'assert';
import nodeWeixinEvents from '../lib';

describe('node-weixin-events', function () {
  it('should listen and emit events', function (done) {
    var events = [
      'OAUTH_SUCCESS', 'ORDER_CREATE', 'ORDER_NOTIFY', 'JSSDK_TICKET_NOTIFY', 'ACCESS_TOKEN_NOTIFY'
    ];
    var cnt = 0;
    for (var i = 0; i < events.length; i++) {
      assert.equal(true, nodeWeixinEvents.on(nodeWeixinEvents[events[i]], (function (idx) {
        return function (v) {
          assert.equal(true, v === idx);
          cnt++;
          if (cnt === events.length) {
            done();
          }
        };
      })(i)));
      assert.equal(true, nodeWeixinEvents.emit(nodeWeixinEvents[events[i]], [i]));
      assert.equal(false, nodeWeixinEvents.emit(nodeWeixinEvents[events[i]], i));
    }
  });
  it('should fail to listen events not defined', function () {
    assert.equal(false, nodeWeixinEvents.on(function() {}, function () {
    }));
    assert.equal(false, nodeWeixinEvents.emit([]));
    assert.equal(false, nodeWeixinEvents.emit('sfsf', function() {

    }));
  });
});
