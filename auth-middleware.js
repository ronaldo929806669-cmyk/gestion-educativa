module.exports = (req, res, next) => {
  if (req.path === '/login' && req.method === 'POST') {
    const { email, password } = req.body;
    
    // Simular validación de usuario
    const users = require('./db.json').users;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Simular JWT token
      const token = `fake-jwt-token-${user.id}`;
      res.status(200).json({
        accessToken: token,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          rol: user.rol
        }
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } else {
    next();
  }
};