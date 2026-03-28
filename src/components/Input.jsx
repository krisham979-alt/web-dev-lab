/**
 * Reusable field: works for text, email, and password (set type prop).
 * "Controlled" means the parent passes value + onChange so state lives in the form.
 */
export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  hint,
}) {
  // Use name as id so label clicks focus the right input
  const id = name;

  return (
    <div className="field">
      {label ? (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={"field-input" + (error ? " field-input-invalid" : "")}
      />

      {hint && !error ? <p className="field-hint">{hint}</p> : null}
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
