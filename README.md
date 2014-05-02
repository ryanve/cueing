# cueing &#9658;&#9658;|
#### Cue, seek, or cycle items in JavaScript in node or the browser

### Basic usage

```js
var cueing = require('cueing')
var list = cueing(['a', 'b', 'c'])

// cue the last index
list.cue(-1) // => 2

// reset the needle to 0
list.needle(0) // => 0

// seek to the last value
list.seek(-1) // => 'c'

// seeking (or cueing) will loop back around
list.seek(-4) // => 'b'
```

## API

#### Parameters

- <var>index</var> refers to a (+/-) integer array index. `-1` reads the last item.
- <var>offset</var> refers to a (+/-) integer to adjust a needle or index by.
- <var>pool</var> refers to an array of items or an integer count

### `cueing(pool=[])`
- Get a new `cueing` instance
- `cueing` instances are array like and inherit array methods

```js
cueing(['1.mp3', '2.mp3', '3.mp3'])
cueing(3) // shorthand for `cueing(new Array(3))`
```

### `cueing()` methods

#### `.needle(index?)`
- Get the current needle or move the needle to `index`
- &rarr; `number`

#### `.cue(offset=0)`
- Get the index at `offset` and reset the needle
- &rarr; `number`

#### `.seek(offset=0)`
- Get the value at `offset` and reset the needle
- &rarr; `*`

#### `.recall(offset=0)`
- Recall previously stored cue points (needles)
- &rarr; `number`|`Array`

#### `.clear()`
- Clear all cue points
- &rarr; `this`

### static methods

#### `cueing.cue(pool, start=0, offset=0)`
- Get the `pool` index that is `offset` away from `start`
- &rarr; `number`

#### `cueing.seek(pool, start=0, offset=0)`
- Get the `pool` value that is `offset` away from `start`
- &rarr; `*`

## License
MIT