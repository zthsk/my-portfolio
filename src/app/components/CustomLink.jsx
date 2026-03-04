import React from "react";

const CustomLink = ({href, children}) => (
	<a
		href={href}
		className="inline-flex items-center border-b border-amber-400/70 text-amber-300 hover:text-amber-200 hover:border-amber-300 transition-colors mr-2"
		target="_blank"
		rel="noopener noreferrer">
		{children}
	</a>
);

export default CustomLink;