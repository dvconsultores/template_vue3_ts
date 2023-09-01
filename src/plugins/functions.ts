import store from '@/store'

export function showLoader(): void {
  store.commit('setLoaderState', true)
}

export function closeLoader(): void {
  store.commit('setLoaderState', false)
}

export function toCssVal(value: any, unit = 'px'): string {
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

export function getUrl(file: File): string|null {
  if (!file) return null
  return URL.createObjectURL(file)
}

export async function getImageSize(file: File): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const width = img.width;
        const height = img.height;
        resolve({ width, height });
      };
      img.src = event.target?.result?.toString() ?? '';
    };
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}
