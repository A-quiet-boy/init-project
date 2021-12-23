import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ErrorBoundary from '~components/ErrorBoundary';
ReactDOM.render(
	<ErrorBoundary>
		<object id="LODOP_OB" classID="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width={0} height={0} style={{ position: 'absolute' }}>
			<embed id="LODOP_EM" type="application/x-print-lodop" width={0} height={0}></embed>
		</object >
		<App />
	</ErrorBoundary >
	, document.getElementById('app'));