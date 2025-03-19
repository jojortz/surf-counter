interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    border?: boolean;
    disabled?: boolean
    fill?: boolean
}

const Button = ({ text, onClick, className, border, disabled, fill }: ButtonProps) => (
    <button 
        onClick={onClick} 
        disabled={disabled}
        aria-disabled={disabled ? "true" : "false"}
        className={`px-4 py-2 font-semibold ${border ? 'bg-white border-blue-600 text-black' : 'bg-blue-600 text-white'} 
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'transition-colors hover:bg-purple-500 hover:text-white cursor-pointer'} 
                    rounded-md ${className || ""} ${fill && 'w-full h-full'}`}
    >
        {text}
    </button>
);


export default Button;