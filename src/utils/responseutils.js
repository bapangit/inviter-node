exports.resSuccessJson = (res, json = { message: "success" }) => {
  res.status(200).json(json);
};

exports.resAuthError = (res) => {
  res.status(401).json({ message: "auhentication failed" });
};

exports.resServerError = (res, json = { message: "internal server error" }) => {
  res.status(500).json(json);
};
