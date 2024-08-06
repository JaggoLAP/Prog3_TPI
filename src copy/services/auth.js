export const registerUser = async (email, password, username) => {
  try {
    const user = { email, password, username };
    localStorage.setItem('user', JSON.stringify(user));
    return { message: 'User registered successfully' };
  } catch (error) {
    throw new Error('Error registering user');
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
      return { message: 'User logged in successfully', token: 'fake-jwt-token' };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};