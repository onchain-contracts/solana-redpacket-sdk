'use strict';

const assert = require('node:assert');

const { RedPacketSDK } = require('../dist/cjs/index.cjs');

assert.ok(RedPacketSDK, 'RedPacketSDK should be defined');
assert.strictEqual(typeof RedPacketSDK, 'function', 'RedPacketSDK should be a class (function)');
assert.strictEqual(RedPacketSDK.name, 'RedPacketSDK', 'RedPacketSDK should have the name "RedPacketSDK"');