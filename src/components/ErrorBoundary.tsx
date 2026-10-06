import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  fallback: ReactNode
  /** Notified once when something below throws, e.g. a chunk that fails to load. */
  onError?: () => void
  children: ReactNode
}

interface ErrorBoundaryState {
  failed: boolean
}

/** Swaps in `fallback` if anything below throws, e.g. a WebGL context that fails to start. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
