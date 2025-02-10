import express from 'express';
import { body, validationResult } from 'express-validator';
import Ajv from 'ajv';
import sanitizeHtml from 'sanitize-html';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '1mb' })); // Restrict JSON body size to 1MB
app.use(cors());

// JSON Schema for validation
const ajv = new Ajv();
const jsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    age: { type: 'integer', minimum: 18 }, // Ensures that age is an integer
    email: { type: 'string', format: 'email' }
  },
  required: ['name', 'age', 'email'],
  additionalProperties: false
};

// Middleware to validate JSON schema
const validateJsonSchema = (req, res, next) => {
  const validate = ajv.compile(jsonSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }
  next();
};

// Middleware to sanitize input
const sanitizeInput = (req, res, next) => {
  if (req.body.name) {
    req.body.name = sanitizeHtml(req.body.name, {
      allowedTags: [], // No HTML tags allowed
      allowedAttributes: {} // No attributes allowed
    });
  }
  next();
};

// Route to handle form submission
app.post('/submit', [
  body('name')
    .isString().withMessage('Name must be a string')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Invalid characters in name') // Prevents SQL injection and invalid characters
    .not().matches(/(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|--|#|;)/i).withMessage('SQL injection attempt detected'), // Blocks SQL injection
  body('age')
    .isInt({ min: 18 }).withMessage('Age must be at least 18')
    .not().matches(/[^0-9]/).withMessage('Age must be a valid number'), // Blocks invalid non-numeric input
  body('email')
    .isEmail().withMessage('Invalid email format')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Invalid email structure') // More strict email validation
], sanitizeInput, validateJsonSchema, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If input is valid, proceed
  res.status(200).json({ message: 'Form submitted successfully!', data: req.body });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
