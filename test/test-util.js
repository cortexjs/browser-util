// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var assert = require('assert');
var util = require('../index');

var createObject = (function() {
  var F = function () {};
  return function (o) {
    if (arguments.length > 1) { throw Error('Second argument not supported');}
    if (o === null) { throw Error('Cannot set a null [[Prototype]]');}
    if (typeof o != 'object') { throw TypeError('Argument must be an object');}
    F.prototype = o;
    return new F();
  };
})();

it('isArray', function() {
  // isArray
  assert.equal(true, util.isArray([]));
  assert.equal(true, util.isArray(Array()));
  assert.equal(true, util.isArray(new Array()));
  assert.equal(true, util.isArray(new Array(5)));
  assert.equal(true, util.isArray(new Array('with', 'some', 'entries')));
  // assert.equal(true, util.isArray(context('Array')()));
  assert.equal(false, util.isArray({}));
  assert.equal(false, util.isArray({
    push: function() {}
  }));
  assert.equal(false, util.isArray(/regexp/));
  assert.equal(false, util.isArray(new Error));

  assert.equal(false, util.isArray(createObject(Array.prototype)));
});


it('isRegExp', function() {
  // // isRegExp
  assert.equal(true, util.isRegExp(/regexp/));
  assert.equal(true, util.isRegExp(RegExp()));
  assert.equal(true, util.isRegExp(new RegExp()));
  assert.equal(false, util.isRegExp({}));
  assert.equal(false, util.isRegExp([]));
  assert.equal(false, util.isRegExp(new Date()));

  assert.equal(false, util.isRegExp(createObject(RegExp.prototype)));
});


it('isDate', function() {
  // isDate
  assert.equal(true, util.isDate(new Date()));
  assert.equal(true, util.isDate(new Date(0)));
  // assert.equal(true, util.isDate(new(context('Date'))));
  assert.equal(false, util.isDate(Date()));
  assert.equal(false, util.isDate({}));
  assert.equal(false, util.isDate([]));
  assert.equal(false, util.isDate(new Error));
  assert.equal(false, util.isDate(createObject(Date.prototype)));
});

it('isError', function() {
  // isError
  assert.equal(true, util.isError(new Error));
  assert.equal(true, util.isError(new TypeError));
  assert.equal(true, util.isError(new SyntaxError));
  // assert.equal(true, util.isError(new(context('Error'))));
  // assert.equal(true, util.isError(new(context('TypeError'))));
  // assert.equal(true, util.isError(new(context('SyntaxError'))));
  assert.equal(false, util.isError({}));
  assert.equal(false, util.isError({
    name: 'Error',
    message: ''
  }));
  assert.equal(false, util.isError([]));
  assert.equal(true, util.isError(createObject(Error.prototype)));
});

// isObject
it('isObject', function() {
  assert.ok(util.isObject({}) === true);
});

// _extend
it('_extend', function() {
  assert.deepEqual(util._extend({a:1}),             {a:1});
  assert.deepEqual(util._extend({a:1}, []),         {a:1});
  assert.deepEqual(util._extend({a:1}, null),       {a:1});
  assert.deepEqual(util._extend({a:1}, true),       {a:1});
  assert.deepEqual(util._extend({a:1}, false),      {a:1});
  assert.deepEqual(util._extend({a:1}, {b:2}),      {a:1, b:2});
  assert.deepEqual(util._extend({a:1, b:2}, {b:3}), {a:1, b:3});
});