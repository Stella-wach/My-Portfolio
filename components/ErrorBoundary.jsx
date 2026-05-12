import { Component } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-destructive/10">
                <AlertCircle className="size-12 text-destructive" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-light tracking-wide">Something went wrong</h1>
              <p className="text-base text-muted-foreground font-light leading-relaxed">We encountered an unexpected error.</p>
            </div>
            <Button onClick={this.handleReset} className="w-full md:w-auto px-8 py-6 text-base font-light tracking-wide">
              Return to Home
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
