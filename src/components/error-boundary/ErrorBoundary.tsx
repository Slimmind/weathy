import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useI18n } from '../../i18n';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

const ErrorFallback: React.FC = () => {
	const { t } = useI18n();
	return (
		<div className='error-boundary'>
			<h2>{t('error.something_wrong')}</h2>
			<p>{t('error.refresh_page')}</p>
		</div>
	);
};

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback || <ErrorFallback />;
		}

		return this.props.children;
	}
}
