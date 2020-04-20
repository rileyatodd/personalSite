import PropTypes from 'prop-types';
import React from 'react';
import NavBar from './navbar';

const Page = ({ title, stylesheet, header, main, footer, script, _relativeURL, _ID, children }) => (
	<html>
	<head>
		<title>Cuttlebelle - { title }</title>
		<meta charSet="utf-8" />
		<meta httpEquiv="x-ua-compatible" content="ie=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="description" content="Personal Website of Riley A Todd" />
		<meta name="author" content="Riley A. Todd" />
		<meta name="robot" content="index, follow" />

		<link rel="stylesheet" href={ _relativeURL( `/assets/css/style.css`, _ID ) } />
		{ stylesheet != undefined
				? <link rel="stylesheet" href={ _relativeURL( `/assets/css/${ stylesheet }.css`, _ID ) } />
				: null }
	</head>
	<body>
		<NavBar />

		<main className="container">
			{ main || children }
		</main>

		<script src={ _relativeURL('/assets/js/index.js') } async defer></script>
		{ script != undefined
				? ( <script src={ _relativeURL( `/assets/js/${ script }.js`, _ID ) } /> )
				: null }
	</body>
	</html>
);

Page.propTypes = {
	title: PropTypes.string.isRequired
};

Page.defaultProps = {};

export default Page;
