# cueing &#9658;&#9658;|
#### Cue, seek, or cycle items in JavaScript in node or the browser

```
npm install cueing --save
```

### Basic usage

```js
var cueing = require('cueing')
var letters = cueing(['a', 'b', 'c'])

// cue the last index and then read from there
letters.cue(-1) // => letters
letters.seek(0) // => 'c'
letters.seek(1) // => 'a'

// manually move the needle
letters.needle(0)

// seek backwards
letters.seek(-1) // => 'c'

// seeking (or cueing) will loop around
letters.seek(-4) // => 'b'
```

## API

### `cueing(pool=[])`
- Get a new `cueing` instance
- `pool`: `number|{length:number}` length or array(-like) of values
- &rarr; `cueing` instance

#### `cueing()` instances are array-like and inherit array methods

```js
var tracks = cueing(['1.mp3', '2.mp3', '3.mp3'])
tracks.join() // '1.mp3,2.mp3,3.mp3'
tracks instanceof cueing // true
tracks instanceof Array // true
Array.isArray(tracks) // false

cueing(3).every(function(v, i, range) {
  // Cueing objects are made dense for use with array iterators
  return undefined === v && i in range && range instanceof cueing
}) // true
```

#### `cueing()` objects coerce to their needle position

```js
var cueing = require('cueing')
var list = cueing(['a', 'b', 'c'])
+list // 0
isFinite(list) // true
list.needle(2) // move the needle to a new index
2 == list // true
+list // 2
String(list) // '2'
list[list] // 'c'
```

### `cueing()` methods

#### `.needle(index?)`
- Manually move the needle to `index`
- `index`: `number|cueing` destination index
- &rarr; `this`

#### `.cue(offset=0)`
- Move the needle by `offset` and store cue point
- `offset`: `number|cueing` +/- integer to move the needle by
- &rarr; `this`

#### `.seek(offset=0)`
- `.cue` the offset and get the value there
- `offset`: `number|cueing` +/- integer to move the needle by
- &rarr; `*`

#### `.recall(index?)`
- Recall previously stored cue points
- `index`: `number|cueing` +/- index to read. `0` reads the oldest point. `-1` reads the newest.
- &rarr; `cueing` instance at recalled state

#### `.store()`
- Manually store the current needle position for recalling later
- `.store` is automatically called whenever `.cue` or `.seek` moves the needle
- &rarr; `this`

#### `.clear()`
- Clear all cue points
- &rarr; `this`

#### `.clone()`
- Clone (copy) a `cueing` instance at its current state to a new instance
- &rarr; `cueing` clone

### Static methods

#### `cueing.cue(pool, start=0, offset=0)`
- Get the `pool` index that is `offset` away from `start`
- &rarr; `number`

```js
cueing.cue(['a', 'b', 'c'], -1) // => 2
cueing.cue(['a', 'b', 'c'], 1, -2) // => 2
```

#### `cueing.seek(pool, start=0, offset=0)`
- Get the `pool` value that is `offset` away from `start`
- &rarr; `*`

```js
cueing.seek(['a', 'b', 'c'], 1, -1) // => 'a'
cueing.seek(['a', 'b', 'c'], 0, 5) // => 'b'
```

## Playground
[Try `cueing` in the browser](http://ryanve.github.io/cueing/)
