import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProviser';

class BCriptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCriptHashProvider;
