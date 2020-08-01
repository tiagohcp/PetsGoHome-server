import IIParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IIParseMailTemplateDTO): Promise<string>;
}
