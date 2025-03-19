import Link from './components/Link';
import CounterContainer from './CounterContainer';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(90vh-100px)] p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
         <CounterContainer />     
      </main>
    </div>
  );
}
