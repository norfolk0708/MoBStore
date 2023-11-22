import React from 'react'
import { toCapitalLetter } from '../../../utils/toCapitalLetter'

const Select = ({ options, defaultValue, value, onChange }) => {

	return (
		<select
			className='formSelect'
			value={value}
			onChange={e => onChange(e.target.value)}
		>
			<option value="">{defaultValue}</option>
			{options.map(option => {
				let name = toCapitalLetter(option)

				return (<option value={option} key={name}>{name} </option>)
			})}
		</select>

	)
}

export default Select

