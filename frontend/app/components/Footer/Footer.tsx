import Link from "../Link";

const Footer = () => {
    return (
        <footer className="flex gap-6 items-center justify-center min-h-[80px] border-t mt-8">
            <div>Built by <Link href='https://www.linkedin.com/in/joseromanortiz'>Jojo</Link> | Powered by <Link href='https://roboflow.com/'>Roboflow</Link></div>
        </footer>
    )
};

export default Footer;