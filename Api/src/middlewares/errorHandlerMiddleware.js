const BadRequestExceptionNames = [
  "ValidationError",
  "PurchaseException",
  "CartException",
  "ReviewException",
  "UserException"
];

const NotFoundExceptionNames = [
    "NotFoundGame",
    "NotFoundUser",
    "NotFoundTag",
]



export function errorHandler(err, req, res, next) {
  if (BadRequestExceptionNames.includes(err.name)) {
    return res.status(400).json({ error: err.message });
  }

  if (NotFoundExceptionNames.includes(err.name)) {
    return res.status(404).json({ error: err.message });
  }

  return res.status(400).json({ error: err.message });
}
