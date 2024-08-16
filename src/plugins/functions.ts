import variables from '@/mixins/variables';
import store from '@/store'
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
const { defaultMaxDecimals } = variables

export function mapRanged(value: number, {fromMin, fromMax, toMin, toMax, invert}: {
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
  invert: boolean
}) {
  invert ??= false

  let mappedValue =
      ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;

  mappedValue = Math.min(Math.max(mappedValue, toMin), toMax);
  return invert ? toMax + toMin - mappedValue : mappedValue;
}

export function createObserver({ options, targets, handle }:
  {
    options?: IntersectionObserverInit | undefined,
    targets: HTMLElement|HTMLElement[]|NodeListOf<Element>,
    handle: IntersectionObserverCallback,
  }): IntersectionObserver {
  options ??= {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList(),
  };

  const observer = new IntersectionObserver(handle, options);
  if (targets instanceof HTMLElement) observer.observe(targets);
  else targets.forEach(el => observer.observe(el))

  return observer
}

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

export function toCssVal(value: any, unit: string): string {
  unit ||= 'px'

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

export async function getFileFromUrl(url: string, type: string) {
  type ||= 'image/jpeg'

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

export function formatBytes(bytes: number, decimals: number) {
  decimals ||= 2

  if (bytes === 0) return "0 B";
  const suffixes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${suffixes[i]}`;
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

export function delayed(timeout: number, callback: Function) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(callback ? callback() : null), timeout);
    } catch (error) {
      reject(error);
    }
  });
}

/// filtering input formatter
export function filteringInputformatter(event: any, allowedRegExp: RegExp) {
  const input = event.target
  let value = input.value

  value = value.split('').filter((char: string) => char.match(allowedRegExp)).join('');

  input.value = value;
  input.blur()
  input.focus()

  return value
}

/// restringed input formatter
export function restringedInputFormatter(event: any, blacklist: string[]) {
  const input = event.target;
  let value = input.value;

  value = value.split('').filter((char: string) => !blacklist.includes(char)).join('');

  input.value = value;
  input.blur();
  input.focus();

  return value;
}

/// input formatter
export function decimalInputformatter(event: any, maxDecimals: number) {
  maxDecimals ||= defaultMaxDecimals

  const input = event.target
  let value = input.value

  if (!new RegExp(`^(\\d+([.,]\\d{0,${maxDecimals}})?)?$`).test(value)) value = value.slice(0, -1)
  value = value.split('.').join(',');

  input.blur()
  input.focus()

  return value
}
