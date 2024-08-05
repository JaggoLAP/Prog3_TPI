
const authService = {
  login: async (username, password) => {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    console.log('direccion: ');
    console.log(import.meta.env.VITE_API_BASE_URL);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api-auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('authService - data: ', data);
      
      if (data.token) {
        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          token: data.token
        }));
        return {
          username: data.username,
          token: data.token
        };
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default authService;