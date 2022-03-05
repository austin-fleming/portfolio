// TODO: this and other universal helpers should be in a separate package to be imported


// https://dev.to/denniscual/typescript-hack-simple-utility-type-for-changing-type-of-keys-4bba
export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType
> = {
  [key in keyof T]: key extends Keys ? NewType : T[key]
}