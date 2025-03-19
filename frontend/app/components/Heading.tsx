interface HeadingProps {
    text: string;
}

const Heading = ({ text }: HeadingProps) => <h1 className="text-3xl font-bold pb-4">{text}</h1>;

export default Heading;