import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
//import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
	InlineGroup as Group,
	InlineGroupSection as Section,
	Container,
	Button
} from '../../elemental';
import {
	loadBackgrounds,
} from './actions';

class Backgrounds extends Component {
	state = {
		dateFrom: moment.utc().startOf('month'),
		dateTo: moment.utc().endOf('day')
	};

	componentDidMount () {
		this.props.dispatch(loadBackgrounds());
		// const datePickers=document.getElementsByClassName("react-datepicker__input-container");
		// for(let i=0; i< datePickers.length; i++) {
		// 	datePickers[i].childNodes[0].setAttribute("readOnly", true);
		// }
	}

	handleDateChange = (dateType) => (date) => {
		const correctedDate = dateType === 'dateTo' ? moment.utc(date).endOf('day') : moment.utc(date).startOf('day');
		this.setState({
			[dateType]: correctedDate
		});
		const newDate = {...this.state};
		newDate[dateType] = correctedDate;
		this.props.dispatch(loadStatistic(newDate));
	}

	handleUpload = () => {
		console.log('asda');
	};
	onDrop = (picture) => {
		console.log(picture);
	}

	render() {
		const tbody = [];
		Object.keys(this.props.rows).forEach(key => {
			tbody.push(
				<tr>
					<td className="ItemList__col">{key}</td>
					<td>{this.props.rows[key]}</td>
				</tr>
			)
		});
		tbody.push(
			<tr>
				<td className="ItemList__col total-bold">TOTAL</td>
				<td className="total-bold">{this.props.total}</td>
			</tr>
		)
		return (
			<Group block>
				<Section grow>
					<Container style={{ paddingTop: '2em' }}>
						<h1>Backgrounds</h1>
						<div style={{ display: 'flex' }}>
							<ImageUploader
								withIcon={true}
								buttonText='Choose images'
								onChange={this.onDrop}
								imgExtension={['.jpg', '.gif', '.png', '.gif']}
								maxFileSize={5242880}
							/>
							<Button onClick={this.handleUpload}>Upload</Button>
							<Button>Delete</Button>
						</div>
						<div className="ItemList-wrapper">
							<table cellpadding="0" cellspacing="0" className="Table ItemList">
								<thead>
								<tr>
									<th>Index</th>
									<th>Source</th>
								</tr>
								</thead>
								<tbody>
								{tbody}
								</tbody>
							</table>
						</div>
					</Container>
				</Section>
			</Group>
		)
	}
}

module.exports = connect((state) => {
	const { rows, total } = state.backgrounds;
	return {
		rows,
		total
	};
})(Backgrounds);
