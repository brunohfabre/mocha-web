import _ from 'lodash'

export const isArrayEqual = function (x: any, y: any) {
  return _(x).xorWith(y, _.isEqual).isEmpty()
}
