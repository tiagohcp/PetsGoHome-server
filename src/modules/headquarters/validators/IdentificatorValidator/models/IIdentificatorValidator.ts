export default interface IIdentificatorValidator {
  validateIdentidicator(identification: string): Promise<boolean>;
}
