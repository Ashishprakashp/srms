// validationUtils.js
import { body, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';

// Regex patterns for validation
const NAME_REGEX = /^[a-zA-Z\s\-']+$/; // Allows letters, spaces, hyphens, and apostrophes
const USER_ID_REGEX = /^[a-zA-Z0-9_\-]+$/; // Alphanumeric, underscores, and hyphens
const COURSE_CODE_REGEX = /^[a-zA-Z0-9\-]+$/; // Alphanumeric and hyphens
const BRANCH_REGEX = /^[a-zA-Z\s]+$/; // Letters and spaces only
const INJECTION_REGEX = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|--|#|;)\b)|(<script>)/i; // Blocks SQL injection and XSS

// Middleware to sanitize input
export const sanitizeInput = (fields) => (req, res, next) => {
  fields.forEach(field => {
    if (req.body[field]) {
      req.body[field] = sanitizeHtml(req.body[field], {
        allowedTags: [], // No HTML tags allowed
        allowedAttributes: {} // No attributes allowed
      });
    }
  });
  next();
};

// Middleware to validate string inputs
export const validateStringInput = (field, regex, errorMessage) => {
  return body(field)
    .trim()
    .notEmpty().withMessage(`${field} is required`)
    .matches(regex).withMessage(errorMessage)
    .not().matches(INJECTION_REGEX).withMessage(`Potential injection attack detected in ${field}`);
};

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};