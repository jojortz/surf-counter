import Link from "../Link";

const Footer = () => {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <div>Built by <Link href='https://www.linkedin.com/in/joseromanortiz'>Jojo</Link> | Powered by <Link href='https://roboflow.com/'>Roboflow</Link></div>
      </footer>
    )
};

export default Footer;