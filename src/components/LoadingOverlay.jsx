function LoadingOverlay({ label = "Loading data..." }) {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-overlay__card">
        <div className="loading-overlay__spinner" aria-hidden="true" />
        <p className="loading-overlay__label">{label}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;