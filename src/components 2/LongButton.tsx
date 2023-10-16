'use client';
interface LongButtonProps {
    text: string;
}
const LongButton = (props: LongButtonProps) => {
    const { text } = props;
    return (
        <button className="bg-background text-font text-lg text-3xl m-auto p-8 py-4 my-8 w-full rounded-3xl shadow-boxOut" onClick={() => { }}>
            <h2>{text}</h2>
        </button>
    )
}

export default LongButton;