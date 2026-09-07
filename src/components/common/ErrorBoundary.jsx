import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '30px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #FECACA',
          margin: '20px',
          boxShadow: '0 4px 6px -1px rgba(15, 37, 55, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#DC2626', marginBottom: 12 }}>
            <AlertTriangle size={22} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Component Render Recovery</h3>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#4A5568', marginBottom: 16 }}>
            A temporary render exception was intercepted. You can reset the view safely.
          </p>
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#FEF2F2',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            color: '#991B1B',
            marginBottom: 16
          }}>
            {this.state.error?.message || "Unknown error"}
          </div>
          <button
            className="btn btn-primary"
            onClick={this.handleReset}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RotateCcw size={14} />
            <span>Reload View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
