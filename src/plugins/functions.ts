import store from '@/store'
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

/// Useful to set intersection threshold
export function buildThresholdList(): number[] {
  const thresholds = [];
  const numSteps = 20;

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

export function showLoader(): void {
  store.commit('setLoaderState', true)
}

export function closeLoader(): void {
  store.commit('setLoaderState', false)
}

export function isOnlyDigits(value: string|number|undefined): boolean {
  if (!value) return false
  const regex = /^[0-9.]+$/
  return regex.test(value.toString())
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

export function capitalizeEachFirstWord(str: string) {
  if (!str) return str
  return str.split(" ").map((str) => capitalize(str)).join(" ");
}

export function capitalize(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function getUrlFromFile(file: File) {
  if (!file) return null
  return URL.createObjectURL(file)
}

export async function getFileFromUrl(url: string, type = 'image/jpeg') {
  const
    response = await fetch(url),
    blob = await response.blob(),
    filename = getFilenameFromUrl(url),
    file = new File([blob], filename, { type })
  
  return file
}

export function getFilenameFromUrl(url: string) {
  const path = url.split('/')

  // Gets the last part, which should be the name of the file
  return path[path.length - 1]
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

export function minutesToSeconds(minutes: number) {
  return minutes * 60
}

export function timeOf(time: Timestamp) {
  return moment(time.seconds * 1000)
}

export function timeFormatter(time: string) {
  return moment(time).format('DD/MM/YYYY HH:MM')
}

export function hourFormatter(time: number) {
  const seconds = Math.floor(time % 60),
  minutes = Math.floor((time / 60) % 60),
  hours = Math.floor((time / 3600) % 24),
  days = Math.floor(time / (3600 * 24))

  let result = "";

  if (days > 0) result += days + "d "
  if (hours > 0) result += hours + "h "
  if (minutes > 0) result += minutes + "min "
  if (seconds > 0) result += seconds + "s"

  return result;
}
