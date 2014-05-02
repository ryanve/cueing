!function(root, name) {
  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('aok') : root.aok
  var cueing = common ? require('../src') : root[name]

  aok('instanceof', cueing() instanceof cueing)
  aok('inherits array', cueing() instanceof Array && 0 === cueing([0]).pop())
  
  aok('instance properties default', function() {
    var o = cueing()
    if (0 !== o.length) return false
    if (0 !== o.needle()) return false
    if (0 !== o.recall().length) return false
    return o.recall() instanceof Array
  })
  
  aok('instance properties range', function() {
    var o = cueing(3)
    if (3 !== o.length) return false
    if (0 !== o.needle()) return false
    if (0 !== o.recall().length) return false
    return true
  })
  
  aok('instance properties array', function() {
    var o = cueing(['a', 'b'])
    if (2 !== o.length) return false
    if (0 !== o.needle()) return false
    if (0 !== o.recall().length) return false
    return true
  })
  
  aok('#cue', function() {
    var letters = ['a', 'b', 'c']
    if (2 !== cueing.cue(letters, -1)) return false
    if (0 !== cueing.cue(letters, 0)) return false
    if (1 !== cueing.cue(letters, 1)) return false
    return true
  })
  
  aok('#cue offset', function() {
    var letters = ['a', 'b', 'c']
    if (2 !== cueing.cue(letters, 1, 1)) return false
    if (0 !== cueing.cue(letters, -1, 1)) return false
    if (0 !== cueing.cue(letters, 2, 1)) return false
    if (1 !== cueing.cue(letters, 0, 4)) return false
    return true
  })
  
  aok('#seek', function() {
    var letters = ['a', 'b', 'c']
    if ('c' !== cueing.seek(letters, -1)) return false
    if ('c' !== cueing.seek(letters, -2, 1)) return false
    if ('a' !== cueing.seek(letters, 0)) return false
    if ('b' !== cueing.seek(letters, 1)) return false
    return true
  })
  
  aok('#seek offset', function() {
    var letters = ['a', 'b', 'c']
    if ('c' !== cueing.seek(letters, 1, 1)) return false
    if ('a' !== cueing.seek(letters, 2, 1)) return false
    if ('b' !== cueing.seek(letters, 0, 4)) return false
    return true
  })
  
  aok('.cue', function() {
    var o = cueing(10)
    if (0 !== o.needle()) return false
    if (1 !== o.cue(1)) return false
    if (0 !== o.cue(-1)) return false
    if (9 !== o.cue(-1)) return false
    if (9 !== o.cue(-30)) return false
    if (9 !== o.needle()) return false
    return true
  })
  
  aok('.seek', function() {
    var o = cueing(['a', 'b', 'c', 'd', 'e'])
    if (0 !== o.needle()) return false
    if ('b' !== o.seek(1)) return false
    if ('a' !== o.seek(-1)) return false
    if ('e' !== o.seek(-1)) return false
    if ('e' !== o.seek(-5)) return false
    if ('e' !== o.seek(-15)) return false
    if ('e' !== o.seek(50)) return false
    if ('a' !== o.seek(51)) return false
    if (4 !== o.recall(-2))  return false
    return true
  })
  
  aok('.needle', function() {
    var o = cueing(10)
    if (1 != o.cue(1) || 1 !== o.needle()) return false
    if (2 != o.cue(1) || 2 !== o.needle()) return false
    if (9 != o.cue(-3) || 9 !== o.needle()) return false
    if (1 != o.needle(1) || 1 !== o.needle()) return false
    if (5 != o.needle(5) || 5 !== o.needle()) return false
    return true
  })
  
  aok('.recall', function() {
    var o = cueing(10)
    o.cue(1)
    o.cue(1)
    if (2 !== o.recall(-1)) return false
    return true
  })
  
  aok('.clear', function() {
    var o = cueing(10)
    o.cue(1)
    o.cue(1)
    o.clear()
    return !o.recall().length
  })
  
}(this, 'cueing');