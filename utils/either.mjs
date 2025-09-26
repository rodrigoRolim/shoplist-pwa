const right = (value) => ({
  map: (fn) => right(fn(value)),
  matchWith: (pattern) => pattern.right(value)
})

const left = (value) => ({
  map: () => left(value),
  matchWith: (pattern) => pattern.left(value)
})

const Either = { left, right }

export { Either }
