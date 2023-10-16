interface NeumorListProps {
    listItems: string[];
}

const NeumourList = (props:NeumorListProps) => {
    const { listItems } = props;
    return (
        <div className="bg-background  shadow-boxOut my-8 rounded-2xl">
            <ul className="divide-y divide-slate-200">
                {listItems.map((item, i) => {
                    return <li key={i} className="p-4 py-4 text-font text-2xl text-center">{item}</li>
                }
                )}
            </ul>

        </div>
    )
}

export default NeumourList;