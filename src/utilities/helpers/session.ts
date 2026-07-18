import { SignJWT, jwtVerify } from 'jose';
import type { JWTPayload } from 'jose';
import Cookies from 'js-cookie';

export interface SessionPayload extends JWTPayload {
  [key: string]: any;
}

export interface SessionConfig {
  expirationDays?: number;
  secretKey: string;
  cookieOptions?: {
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    path?: string;
  };
}

export class SessionManager {
  private readonly expirationDays: number;
  private readonly encodedKey: Uint8Array;
  private readonly cookieOptions: {
    secure: boolean;
    sameSite: 'strict' | 'lax' | 'none';
    path: string;
  };

  constructor(config: SessionConfig) {
    if (!config.secretKey) {
      throw new Error('Missing environment variable: VITE_SESSION_SECRET');
    }

    this.expirationDays = config.expirationDays || 30;
    this.encodedKey = new TextEncoder().encode(config.secretKey);
    this.cookieOptions = {
      secure: true,
      sameSite: 'strict',
      path: '/',
      ...config.cookieOptions,
    };
  }

  private getExpiryDate(): Date {
    return new Date(Date.now() + this.expirationDays * 24 * 60 * 60 * 1000);
  }

  public async encrypt(payload: SessionPayload): Promise<string> {
    try {
      return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${this.expirationDays}d`)
        .sign(this.encodedKey);
    } catch (err) {
      throw new Error(`Encrypt failed: ${(err as Error).message}`);
    }
  }

  public async decrypt(sessionToken?: string): Promise<SessionPayload | null> {
    if (!sessionToken) return null;

    try {
      const { payload } = await jwtVerify(sessionToken, this.encodedKey, {
        algorithms: ['HS256'],
      });

      return payload as SessionPayload;
    } catch {
      return null;
    }
  }

  public async createSession({
    payload,
    sessionKey,
  }: {
    payload: SessionPayload;
    sessionKey: string;
  }): Promise<string> {
    try {
      const token = await this.encrypt(payload);

      Cookies.set(sessionKey, token, {
        ...this.cookieOptions,
        expires: this.getExpiryDate(),
      });

      return token;
    } catch (err) {
      throw new Error(`CREATE_SESSION error: ${(err as Error).message}`);
    }
  }

  public async updateSession(sessionKey: string): Promise<boolean> {
    const token = Cookies.get(sessionKey);
    if (!token) return false;

    const payload = await this.decrypt(token);
    if (!payload) {
      this.deleteSession(sessionKey);
      return false;
    }

    Cookies.set(sessionKey, token, {
      ...this.cookieOptions,
      expires: this.getExpiryDate(),
    });

    return true;
  }

  public async getSession(sessionKey: string): Promise<SessionPayload | null> {
    const token = Cookies.get(sessionKey);
    if (!token) return null;

    return this.decrypt(token);
  }

  public deleteSession(sessionKey: string): void {
    Cookies.remove(sessionKey, { path: this.cookieOptions.path });
  }
}

export const session = new SessionManager({
  secretKey: process.env.REACT_APP_SESSION_SECRET!,
});
