import { FieldValues } from 'react-hook-form'

type ArrayKey<T> = readonly (keyof T)[]

type PickFromArray<T, P extends ArrayKey<T>> = {
  [K in P[number]]: T[K]
}

type OmitFromArray<T, P extends ArrayKey<T>> = { [K in Exclude<keyof T, P[number]>]: T[K] }

export function pick<T extends FieldValues = FieldValues, P extends ArrayKey<T> = ArrayKey<T>>(
  object: T,
  ...paths: readonly [...P]
): PickFromArray<T, P> {
  return object == null
    ? ({} as any)
    : paths.reduce((obj: PickFromArray<T, P>, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
          obj[key] = object[key]
        }
        return obj
      }, {} as any)
}

export function omit<T extends {}, P extends ArrayKey<T> = ArrayKey<T>>(
  target: T,
  ...paths: readonly [...P]
): OmitFromArray<T, P> {
  const instance: any = !target ? {} : { ...target }
  return paths.reduce((obj: any, key) => {
    if (obj && Object.prototype.hasOwnProperty.call(target, key)) {
      delete instance[key]
    }
    return obj
  }, instance) as OmitFromArray<T, P>
}

export function omitValue<T extends FieldValues = FieldValues>(object: T, ...values: Array<any>) {
  if (object == null) return {} as T
  const newObj: any = {}
  ;(Object.keys(object) as ArrayKey<T>).forEach((key) => {
    const value = object[key]
    if (!values.includes(value)) newObj[key] = value
  })
  return newObj as T
}
