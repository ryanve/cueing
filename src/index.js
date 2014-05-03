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
   * @param {number|{length:number}|Cueing} pool length or items
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
   * @param {(number|Number|Cueing)=} current index (+/-)
   * @param {(number|Number|Cueing)=} next offset (+/-)
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
   * @param {(number|Number|Cueing)=} current index (+/-)
   * @param {(number|Number|Cueing)=} next offset (+/-)
   * @return {*} value
   */
  cueing.seek = function(pool, current, next) {
    return pool[cueing.cue(pool, current, next)]
  }
  
  /**
   * @this {Cueing} instance to clone
   * @return {Cueing} clone
   */
  model.clone = function() {
    var clone = cueing(this).needle(this._needle)
    clone.push.apply(clone._recall, this._recall)
    return clone
  }

  /**
   * @this {Cueing}
   * @param {(number|Number|Cueing)=} index to manually move the needle to
   * @return {Cueing} object with updated needle position
   */
  model.needle = function(index) {
    if (null != index) this._needle = +index || 0
    return this
  }

  /**
   * @this {Cueing} object with memory to store to
   * @return {Cueing}
   */
  model.store = function() {
    var recall = this._recall, point = this._needle
    if (recall[recall.length-1] !== point) recall.push(point)
    return this
  }
  
  /**
   * @this {Cueing} object with memory to clear
   * @return {Cueing} object with memory cleared
   */
  model.clear = function() {
    this._recall.length = 0
    return this
  }

  /**
   * @this {Cueing} object to recall from
   * @param {(number|Number|Cueing)=} index (+/-) of the cue point to recall
   * @return {Cueing} object with all recalls or cued to recalled point
   */
  model.recall = function(index) {
    if (null == index) return cueing(this._recall)
    return this.needle(cueing.seek(this._recall, index))
  }

  /**
   * @this {Cueing}
   * @param {(number|Number|Cueing)=} offset (+/-)
   * @return {Cueing} object cued to offset
   */
  model.cue = function(offset) {
    return this.needle(cueing.cue(this, this._needle, offset)).store()
  }

  /**
   * @this {Cueing}
   * @param {(number|Number|Cueing)=} offset (+/-)
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
    return '' + this._needle
  }

  return cueing
});