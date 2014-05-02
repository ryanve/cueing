/*!
 * cueing 0.0.0+201405020243
 * https://github.com/ryanve/cueing
 * MIT License (c) 2014 Ryan Van Etten
 */
!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'cueing', function() {

  var model = cueing.prototype = Cueing.prototype = []

  /**
   * @param {number|{length:number}} pool items or length
   * @return {Cueing}
   */
  function cueing(pool) {
    return new Cueing(pool)
  }

  /**
   * @constructor
   * @param {number|{length:number}} pool length or items
   */
  function Cueing(pool) {
    if (typeof pool == 'number') pool = new Array(pool)
    for (var i = 0, l = pool && pool.length; i < l;) this[i] = pool[i++]
    this.length = i || +pool || 0
    this._needle = 0
    this._recall = []
  }

  /**
   * @param {number|{length:number}} pool
   * @param {number=} current index (+/-)
   * @param {number=} next offset (+/-)
   * @return {number} index
   */
  cueing.cue = function(pool, current, next) {
    if (typeof pool != 'number') pool = +pool.length
    if (0 >= pool) return -1
    current = +current || 0
    if (0 > current) current += pool
    next = +next
    if (!next) return current
    next += current
    if (next >= pool) next = next % pool
    else if (0 > next) next = next % pool + pool
    return next === next ? next : -1
  }
  
  /**
   * @param {{length:number}} pool
   * @param {number=} current index (+/-)
   * @param {number=} next offset (+/-)
   * @return {*} value
   */
  cueing.seek = function(pool, current, next) {
    return pool[cueing.cue(pool, current, next)]
  }

  /**
   * @this {Cueing}
   * @param {number=} index (+/-)
   * @return {number} index
   */
  model.needle = function(index) {
    if (null == index) return this._needle
    this._needle = +index || 0
    this._needle === cueing.cue(this._recall, -1) || this._recall.push(this._needle)
    return this._needle
  }
  
  /**
   * @this {Cueing}
   * @param {number=} offset (+/-)
   * @return {Array|number}
   */
  model.recall = function(offset) {
    return null == offset ? this._recall : cueing.seek(this._recall, offset)
  }
  
  /**
   * @this {Cueing}
   * @return {Cueing}
   */
  model.clear = function() {
    this._recall.length = 0
    return this
  }

  /**
   * @this {Cueing}
   * @param {number=} offset (+/-)
   * @return {number}
   */
  model.cue = function(offset) {
    return this.needle(cueing.cue(this, this.needle(), offset))
  }
  
  /**
   * @this {Cueing}
   * @param {number=} offset (+/-)
   * @return {*} value
   */
  model.seek = function(offset) {
    return this[this.cue(offset)]
  }
  
  /**
   * @this {Cueing}
   * @return {string} index
   */
  model.toString = function() {
    return '' + this.needle()
  }

  return cueing
});