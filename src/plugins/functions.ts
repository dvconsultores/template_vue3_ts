export function toCssVal(value: any, unit = 'px') {
  // helper
  function setValue(val: string|number|Array<number|string>, i: number|null) {
    if (typeof val === 'string') return val

    const def = `${val}${unit}`
    switch (length) {
      case 2: { if (i === 1) return `${val}em` } break;
      case 3: { if (i === 1) return `${val}vw` } break;
    }

    return def
  }

  if (Number.isFinite(value)) {
    return `${value}${unit}`
  } else if (Array.isArray(value)) {
    const length = value.length
    const formatValue = value.map((e, i) => setValue(e, i)).join(',')

    switch (length) {
      case 1: return setValue(value.at(0), null)
      case 2: return `max(${formatValue})`
      default: return `clamp(${formatValue})`
    }
  }

  return value
}
