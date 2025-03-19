interface ParagraphProps {
    children: React.ReactNode;
    bold?: boolean;
  }
  
  const Paragraph = ({ children, bold = false }: ParagraphProps) => {
    return <p className={`text-md sm:text-lg mb-4 sm:mb-6 ${bold ? 'font-bold' : ''}`}>{children}</p>;
  };

  export default Paragraph;
  