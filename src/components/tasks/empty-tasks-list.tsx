export default function EmptyTasksList() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[url('/bg-haikei.png')] bg-no-repeat bg-center">
            <strong className="text-2xl text-neutral-100 font-bold text-center">
                Parece que não há nenhuma <br />
                tarefa cadastrada!
            </strong>
        </div>
    )
}