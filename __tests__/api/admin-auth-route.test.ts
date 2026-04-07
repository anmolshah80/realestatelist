import { ADMIN_COOKIE_NAME } from '@/lib/constants';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('app/api/v1/auth/admin route', () => {
  let mockCookies: jest.Mock;
  let POST: any;
  let DELETE: any;

  beforeEach(() => {
    jest.resetModules();
    process.env.ADMIN_EMAIL = 'admin@gmail.com';
    process.env.ADMIN_PASSWORD = 'AdminUser@1892#';

    const nextHeaders = require('next/headers');
    mockCookies = nextHeaders.cookies as jest.Mock;

    const route = require('../../app/api/v1/auth/admin/route');
    POST = route.POST;
    DELETE = route.DELETE;

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const makeRequest = (body: Record<string, unknown>) =>
    ({
      json: jest.fn().mockResolvedValue(body),
    }) as any;

  const makeCookieStore = () => ({
    set: jest.fn(),
  });

  it('returns 400 when email or password is missing', async () => {
    mockCookies.mockReturnValue(makeCookieStore());

    const request = makeRequest({});
    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Email and password are required',
    });
  });

  it('returns 401 when credentials are invalid', async () => {
    mockCookies.mockReturnValue(makeCookieStore());

    const request = makeRequest({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });
    const response = await POST(request);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: 'Invalid email or password',
    });
  });

  it('returns 200 and sets a secure admin cookie on successful login', async () => {
    const cookieStore = makeCookieStore();
    mockCookies.mockReturnValue(cookieStore);

    const request = makeRequest({
      email: 'admin@gmail.com',
      password: 'AdminUser@1892#',
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(cookieStore.set).toHaveBeenCalledWith(
      ADMIN_COOKIE_NAME,
      'true',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24,
        path: '/',
      }),
    );
  });

  it('returns 200 and clears the admin cookie on logout', async () => {
    const cookieStore = makeCookieStore();
    mockCookies.mockReturnValue(cookieStore);

    const response = await DELETE();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(cookieStore.set).toHaveBeenCalledWith(ADMIN_COOKIE_NAME, '');
  });
});
