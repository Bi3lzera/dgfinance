import Lancamentos from './lancamentos';

export default function DespesasPage() {
    return (
        <div className="rounded-md w-[95vw] h-[92vh]">
            <section className="h-[46vh]">
                <Lancamentos/>
            </section>
            <section className="h-[46vh]">
                <Lancamentos />
            </section>
        </div>
    );
}
