const API_BASE_URL = 'http://localhost:5000/api';

class AuthService {
  constructor() {
    // No axios instance needed for mock service
  }

  async login(credentials) {
    if (credentials.email && credentials.password) {
      const mockResponse = {
        user: {
          id: 1,
          email: credentials.email,
          name: 'User',
          role: 'user',
          state: 'MP'
        },
        token: 'mock-jwt-token-' + Date.now()
      };
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockResponse;
    }
    throw new Error('Invalid credentials');
  }

  async register(userData) {
    const mockResponse = {
      user: {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        state: userData.state
      },
      token: 'mock-jwt-token-' + Date.now()
    };
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockResponse;
  }

  async forgotPassword() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Password reset email sent' };
  }

  async resetPassword() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Password reset successfully' };
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        id: 1,
        email: 'user@example.com',
        name: 'User',
        role: 'user',
        state: 'MP'
      };
    }
    return null;
  }

  async updateProfile(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...userData, updated: true };
  }

  async changePassword() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Password changed successfully' };
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
