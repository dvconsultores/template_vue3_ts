import { useToast } from "vue-toastification"

export default () => {
  const toast = useToast()

  // set-properties =========================================================================================================//
  Object.defineProperty(HTMLElement.prototype, 'setProperty', {
    value: function(props: object|HTMLElement) {
      for (const [keys, values] of Object.entries(props)) {
        this.style.setProperty(`--${keys}`, values)
      }
    }
  })
  // htmlElement.setProperty({keys, values})  <--- example


  // to-capitalize =========================================================================================================//
  Object.defineProperty(String.prototype, 'toCapitalize', {
    value: function() {
      return this.replace(/^\w/, (c: string) => c.toUpperCase());
    }
  })
  // string.toCapitalize() <-- example


  // to-kedabcase =========================================================================================================//
  Object.defineProperty(String.prototype, 'toKedabCase', {
    value: function() {
      return this && this
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x: string) => x.toLowerCase())
        .join('-');
    }
  })
  // string.toKedabCase() <-- example


  // to-snakecase =========================================================================================================//
  Object.defineProperty(String.prototype, 'toSnakeCase', {
    value: function() {
    return this && this
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x: string) => x.toLowerCase())
      .join('_');
    }
  })
  // string.toSnakeCase() <-- example


  // limitString =========================================================================================================//
  Object.defineProperty(String.prototype, 'limitString', {
    value: function(limit: number) {
      if (this.length > limit) return `${this.substring(0, limit)}...`
      return this
    }
  })
  // string.limitString(limit) <-- example


  // cutString =========================================================================================================//
  Object.defineProperty(String.prototype, 'cutString', {
    value: function(start = 7, end = 4) {
      if (this.length > start + end) return `${this.substring(0, start)}...${this.substring(this.length - end, this.length)}`;
      return this
    }
  })
  // string.cutString(start, end) <-- example


  // toMonthName =========================================================================================================//
  Object.defineProperty(Number.prototype, 'toMonthName', {
    value: function(/* length = 'short', lang = 'en-US' */) {
      const date = new Date();
      date.setMonth(this - 1);

      return date.toLocaleString()
      // return date.toLocaleString(lang, { // <-- if [] empty will auto search locale
      //   month: length, // <-- can be long or short
      // });
    }
  })
  // toMonthName(length, lang) <-- example


  // toDayName =========================================================================================================//
  Object.defineProperty(Number.prototype, 'toDayName', {
    value: function(/* length = 'long', lang = 'en-US' */) {
      const date = new Date()
      date.setDate(this - 1)

      return date.toLocaleString()
      // return date.toLocaleString(lang, { // <-- if [] empty will auto search locale
      //   weekday: length, // <-- can be long or short
      // });
    }
  })
  // toDayName(length, lang) <-- example


  // formatter =========================================================================================================//
  Object.defineProperty(Number.prototype, 'formatter', {
    value: function(bloqMayus: 'B'|'b'|'M'|'m'|'K'|'k', decimals = 1) {
      if (Math.abs(this) > 999999999) {
        return `${Math.sign(this) * Number((Math.abs(this)/1000000000).toFixed(decimals))}${bloqMayus ? 'B' : 'b'}`
      } else if (Math.abs(this) > 999999) {
        return `${Math.sign(this) * Number((Math.abs(this)/1000000).toFixed(decimals))}${bloqMayus ? 'M' : 'm'}`
      } else if (Math.abs(this) > 999) {
        return `${Math.sign(this) * Number((Math.abs(this)/1000).toFixed(decimals))}${bloqMayus ? 'K' : 'k'}`
      } else {
        return Math.sign(this)*Math.abs(this)
      }
    }
  })
  // formatter(number) <-- example

  // groupBy =========================================================================================================//
  Object.defineProperty(Array.prototype, 'groupBy', {
    value: function(by: string) {
      return this.reduce((acc: any, obj: any) => {
        const key = obj[by];
        const curGroup = acc[key] ?? [];
        
        return { ...acc, [key]: [...curGroup, obj] };
      }, {});
    }
  })
  // groupBy(by) <-- example

  // groupAtPairs =========================================================================================================//
  Object.defineProperty(Array.prototype, 'groupAtPairs', {
    value: function() {
      const pairs = this.filter((item: any, i: number) => i % 2 === 0);
      const unpairs = this.filter((item: any, i: number) => i % 2 !== 0);
      
      return unpairs.map((item: any, i: number) => [unpairs[i], pairs[i]])
    }
  })
  // groupAtPairs() <-- example

  // formatTime =========================================================================================================//
  Object.defineProperty(Number.prototype, 'formatTime', {
    value: function() {
      let minutes = Math.floor(this / 60);
      let seconds = this
      minutes = (minutes >= 10) ? minutes : 0 + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : 0 + seconds;
      return `${minutes}:${seconds}`;
    }
  })
  // formatTime() <-- example

  // pad =========================================================================================================//
  Object.defineProperty(Number.prototype, 'pad', {
    value: function(n: number) {
      return new Array(n).join('0').slice((n || 2) * -1) + this;
    }
  })
  // pad(2) <-- example


  // copy to clipboard =========================================================================================================//
  Object.defineProperty(String.prototype, 'copyToClipboard', {
    value: async function(message: string|null) {
      await navigator.clipboard.writeText(this)
      if (message) toast.info(message)
    }
  })
  // copyToClipboard() <-- example


  // split url =========================================================================================================//
  Object.defineProperty(String.prototype, 'splitUrl', {
    value: function(by: string, at: number) {
      return this.split(by).at(at)
    }
  })
  // splitUrl('?', 0) <-- example
}
