import React from "react";

const CustomLink = ({href, children}) => (
	<a
		href={href}
		className="inline-flex items-center border-b border-cyan-300/70 text-cyan-200 hover:text-cyan-100 hover:border-cyan-200 transition-colors mr-2"
		target="_blank"
		rel="noopener noreferrer">
		{children}
	</a>
);

export default CustomLink;
