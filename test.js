!function(root, name) {
  var common = typeof module != 'undefined' && !!module.exports
  var cueing = common ? require('./') : root[name]

  function ok(desc, test) {
    if (typeof test == 'function') test = test()
    if (!test) throw new Error(desc)
  }

  ok('instanceof', cueing() instanceof cueing)
  ok('inherits array', cueing() instanceof Array && 0 === cueing([0]).pop())

  ok('default instance properties', function() {
    var o = cueing()
    if (0 !== o.length) return false
    if (0 !== o._needle) return false
    if (o._needle != o.needle()) return false
    if (0 !== o.recall().length) return false
    return o.recall() instanceof cueing
  })

  ok('instance properties from range', function() {
    var o = cueing(3)
    if (3 !== o.length) return false
    if (0 !== +o.needle()) return false
    if (0 !== o.recall().length) return false
    return true
  })

  ok('instance properties from array', function() {
    var o = cueing(['a', 'b'])
    if (2 !== o.length) return false
    if (0 !== +o.needle()) return false
    if (0 !== o.recall().length) return false
    return true
  })

  ok('instance coerces to needle', function() {
    var o = cueing(['a'])
    if (o._needle != o) return false
    if (0 !== +o) return false
    if ('0' !== String(o)) return false
    if (o !== [o][o]) return false
    if (0 !== o._needle) return false
    if (o !== o.needle() || o !== o.needle(0)) return false
    return isFinite(o)
  })

  ok('#cue', function() {
    var letters = ['a', 'b', 'c']
    if (2 !== +cueing.cue(letters, -1)) return false
    if (0 !== +cueing.cue(letters, 0)) return false
    if (1 !== +cueing.cue(letters, 1)) return false
    return true
  })

  ok('#cue offset', function() {
    var letters = ['a', 'b', 'c']
    if (2 !== +cueing.cue(letters, 1, 1)) return false
    if (0 !== +cueing.cue(letters, -1, 1)) return false
    if (0 !== +cueing.cue(letters, 2, 1)) return false
    if (1 !== +cueing.cue(letters, 0, 4)) return false
    return true
  })

  ok('#seek', function() {
    var letters = ['a', 'b', 'c']
    if ('c' !== cueing.seek(letters, -1)) return false
    if ('c' !== cueing.seek(letters, -2, 1)) return false
    if ('a' !== cueing.seek(letters, 0)) return false
    if ('b' !== cueing.seek(letters, 1)) return false
    return true
  })

  ok('#seek offset', function() {
    var letters = ['a', 'b', 'c']
    if ('c' !== cueing.seek(letters, 1, 1)) return false
    if ('a' !== cueing.seek(letters, 2, 1)) return false
    if ('b' !== cueing.seek(letters, 0, 4)) return false
    return true
  })

  ok('.cue', function() {
    var o = cueing(10)
    if (0 !== +o) return false
    if (1 !== +o.cue(1)) return false
    if (0 !== +o.cue(-1)) return false
    if (9 !== +o.cue(-1)) return false
    if (9 !== +o.cue(-30)) return false
    if (9 !== +o) return false
    return true
  })

  ok('.seek', function() {
    var o = cueing(['a', 'b', 'c', 'd', 'e'])
    if (0 !== +o.needle()) return false
    if ('b' !== o.seek(1)) return false
    if ('a' !== o.seek(-1)) return false
    if ('e' !== o.seek(-1)) return false
    if ('e' !== o.seek(-5)) return false
    if ('e' !== o.seek(-15)) return false
    if ('e' !== o.seek(50)) return false
    if ('a' !== o.seek(51)) return false
    return true
  })

  ok('.needle', function() {
    var o = cueing(10)
    if (1 !== +o.cue(1) || 1 != o.needle()) return false
    if (2 !== +o.cue(1) || 2 != o.needle()) return false
    if (9 !== +o.cue(-3) || 9 != o.needle()) return false
    if (1 !== +o.needle(1) || 1 != o.needle()) return false
    if (5 !== +o.needle(5) || 5 != o.needle()) return false
    return true
  })

  ok('.clone', function() {
    var o = cueing(['a', 'b']), clone = o.clone()
    if (o === clone) return false
    if (o._needle !== clone._needle) return false
    if (o._recall === clone._recall) return false
    if (o.join() !== clone.join()) return false
    return o.recall().length === clone.recall().length
  })

  ok('.store', function() {
    var o = cueing().needle(1)
    if (o !== o.store()) return false
    if (1 !== cueing.seek(o._recall, -1)) return false
    var stored = o._recall.length
    return 2 > o.store().store()._recall.length - stored
  })

  ok('.recall', function() {
    var o = cueing(10).store().cue(1).store().cue(1).store()
    if (+o.needle() !== +o.recall(-1)) return false
    if (o._recall.join() !== o.recall().join()) return false
    if (5 !== o.needle(5).store()._recall.pop()) return false
    return o.recall(0) instanceof cueing
  })

  ok('.clear', function() {
    var o = cueing(10)
    o.cue(1)
    o.cue(1)
    o.clear()
    return !o.recall().length
  })

  try {
    console.info('Tests passed =)')
    window.console.dir(cueing)
  } catch (e) {}
}(this, 'cueing');
