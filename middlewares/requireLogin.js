module.exports = (req, res, next) => {
  // si el ususario no esta logueado (si passport no encuentra un usario
  // al que se hace referenicia en la cookie enviada en la request) se finaliza de
  // forma temprana (se para la cadena de middlewares)la request enviando un error
  if (!req.body) {
    res.status(401).send({ error: "You must log in!" });
  }

  // PERO si el usario esta logueado, se permite a la request continar con
  // el siguiente middleware de la cadena/chain (o el route handler en este caso)
  next();
};
