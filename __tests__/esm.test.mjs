import assert from 'node:assert';

import { RedPacketSDK } from '../dist/esm/index.mjs';

assert.ok(RedPacketSDK, 'RedPacketSDK should be defined');
assert.strictEqual(typeof RedPacketSDK, 'function', 'RedPacketSDK should be a class (function)');
assert.strictEqual(RedPacketSDK.name, 'RedPacketSDK', 'RedPacketSDK should have the name "RedPacketSDK"');