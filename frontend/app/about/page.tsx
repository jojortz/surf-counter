'use client';
import Button from "../components/Button"
import Container from "../components/Container"
import Heading from "../components/Heading"
import Link from "../components/Link";
import Paragraph from "../components/Paragraph"
import { useRouter } from 'next/navigation';


const AboutPage = () => {
    const router = useRouter();
    return (
        <Container>
            <div className="min-h-[85vh]">
                <Heading text="About"/>
                <Paragraph>Surf Counter is a prototype of a concept I've had in the back of my mind for some time. I'm a surfer, and there's an app called <Link href="https://www.surfline.com">Surfline</Link> which lets you access webcams to view live and recorded footage of surf spots.</Paragraph>
                <Paragraph>I'm always checking the cams to see how the waves look and also check how crowded a spot is. For checking crowds, it would be nice to know how crowded a spot is, but also to look at historical trends and understand different crowds for different times of the year and conditions.</Paragraph>
                <Paragraph>Now, it would be rather tedious to go through all this footage and manually count surfers. That's were Roboflow and Computer vision comes in. With Roboflow, I was able to finetune a model on some Surfline camera footage. Then, I'm able to call that model directly in a workflow to get both the count of the surfers, as well as the annotated image.</Paragraph>
                <Paragraph>In this demo, you can get a frame from a recorded Surfline video, and annotate it with the Roboflow model.</Paragraph>
                <div className="flex w-full items-center justify-center">
                    <Button
                        onClick={() => router.push('/')}
                        text="Go to Demo"
                        fill
                    />
                </div>
            </div>
        </Container>
    )
}

export default AboutPage;