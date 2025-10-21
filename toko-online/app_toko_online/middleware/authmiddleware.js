exports.adminOnly = (req, res, next) => {
  const isAdmin = req.body.isAdmin; // Contoh: { "isAdmin": true }
  if (isAdmin === true) {
    console.log('Middleware: Akses Admin Diberikan.');
    next(); // Lanjutkan
  } else {
    // 403 Forbidden
    return res.status(403).json({ 
      success: false, 
      message: 'Akses Ditolak. Endpoint ini membutuhkan hak Admin.' 
    });
  }
};