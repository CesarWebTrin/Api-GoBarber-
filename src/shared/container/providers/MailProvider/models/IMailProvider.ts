import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(dat: ISendMailDTO): Promise<void>;
}
