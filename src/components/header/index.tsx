import Image from 'next/image'

export default function Header() {
    return (
        <header className="
            w-full h-20 flex items-center justify-center bg-neutral-900
            border-b-2 border-neutral-800">
            <div className="
                w-full max-w-5xl py-2">
                <div className="flex gap-2 items-center">
                    <Image
                        src="/icon.png" alt="Ícone de um checkbox azul"
                        width={25} height={25} quality={100} />

                    <h1 className="text-3xl text-sky-500 font-bold">
                        Omega&nbsp;
                        <span className="text-neutral-100">
                            Tasks
                        </span>
                    </h1>
                </div>
            </div>
        </header>
    )
}