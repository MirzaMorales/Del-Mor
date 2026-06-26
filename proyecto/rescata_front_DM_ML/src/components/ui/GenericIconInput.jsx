import './GenericIconInput.css';

export default function GenericIconInput({
  label,
  id,
  type = 'text',
  icon,
  error,
  success,
  register,
  ...rest
}) {
  const hasError = !!error;
  const isSuccess = !!success && !error;

  return (
    <div className="generic-input-container">
      {label && (
        <label htmlFor={id} className="generic-input-label">
          {label}
        </label>
      )}
      <div className="generic-input-wrapper">
        {icon && <span className="generic-input-left-icon">{icon}</span>}
        <input
          id={id}
          type={type}
          className={`generic-input-field ${icon ? 'has-left-icon' : ''} ${
            hasError ? 'is-invalid' : isSuccess ? 'is-valid' : ''
          }`}
          {...(register ? register(id) : {})}
          {...rest}
        />
        {/* Right validation icon */}
        {hasError && (
          <span className="generic-input-right-icon error-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        )}
        {isSuccess && (
          <span className="generic-input-right-icon success-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        )}
      </div>
      <div className="generic-input-error-wrapper">
        <span className={`generic-input-error-message ${hasError ? 'show' : ''}`}>
          {error}
        </span>
      </div>
    </div>
  );
}
