import React from "react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className?: string;
};

const Link: React.FC<LinkProps> = ({ href, className, children, ...props }) => {
  return (
    <a
        href={href}
        className={`text-blue-600 transition-colors hover:text-purple-500 ${className || ""}`}
        {...props}
        target="_blank"
    >
        {children}
    </a>
  );
};

export default Link;
