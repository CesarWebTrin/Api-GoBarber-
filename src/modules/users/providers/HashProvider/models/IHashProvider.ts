export default interface IHashProvider {
  generateHash(pauload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
