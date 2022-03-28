type Props = {
    heading: string
};

const Heading = (props: Props) => {
    const { heading } = props;
    return (
        <div className='col'>
			<h1>{heading}</h1>
		</div>
    )
}

export default Heading;