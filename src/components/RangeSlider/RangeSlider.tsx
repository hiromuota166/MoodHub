import "./styles.scss";
interface RangeSliderProps {
	min: number;
	max: number;
	value: number;
	step?: number;
	onChange: (value: number) => void;
	label?: string;
	id?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, value, step = 1, onChange, label, id }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(event.target.value));
	};

	return (
		<div className='rounded-3xl shadow-boxOut p-8 '>
			{label && (
				<label htmlFor={id} className='text-font'>
					{label}: <span>{value}</span>
				</label>
			)}
			<input
				type='range'
				min={min}
				max={max}
				value={value}
				step={step}
				onChange={handleChange}
				id={id}
				className='range-style'
			/>
		</div>
	);
};

export default RangeSlider;

