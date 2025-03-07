import Heading from './components/Heading';
import Link from './components/Link';
import CounterContainer from './CounterContainer';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
         <Heading text='Surf Counter'/>
         <CounterContainer />     
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>Built by <Link href='https://www.linkedin.com/in/joseromanortiz'>Jojo</Link> | Powered by <Link href='https://roboflow.com/'>Roboflow</Link></div>
      </footer>
    </div>
  );
}
