const moment = require('moment-timezone')
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

class Trait {
  constructor (Timezone) {
    this.Timezone = Timezone
  }

  register (Model) {
    const Timezone = this.Timezone
    function timezoneFormat (value, format = DATE_FORMAT) {
      const timeZone = Timezone.timezone()

      if (!timeZone) {
        return moment(value).format(format)
      }

      const datetime = moment(value).tz(timeZone).format(format)

      return datetime
    }

    const clone = Object.assign(Object.create(Object.getPrototypeOf(Model)), Model)

    Object.defineProperties(clone, {
      castDates: {
        value: function (key, value) {
          return timezoneFormat(value)
        }
      },
      timezoneFormat: {
        value: timezoneFormat
      }
    })

    Object.setPrototypeOf(Model, clone)
  }
}

module.exports = Trait
