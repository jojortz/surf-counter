interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    border?: boolean;
    disabled?: boolean
}

const Button = ({ text, onClick, className, border, disabled }: ButtonProps) => (
    <button 
        onClick={onClick} 
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`px-4 py-2 ${border ? 'bg-white border-blue-600 text-black' : 'bg-blue-600 text-white'} 
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'transition-colors hover:bg-purple-500 hover:text-white cursor-pointer'} 
                    rounded-md ${className || ""}`}
    >
        {text}
    </button>
);


export default Button;