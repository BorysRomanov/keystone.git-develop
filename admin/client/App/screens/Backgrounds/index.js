import React, { Component } from 'react';
import { connect } from 'react-redux';
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
	createBackgrounds,
	deleteBackgrounds,
} from './actions';

class Backgrounds extends Component {

	componentDidMount () {
		this.props.dispatch(loadBackgrounds());
	}

	handleUpload = () => {
		console.log('afaf');
		//this.refs.imgInput;
	};

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		const files = e.target.files;
		console.log(files);
		const formData = new FormData();
		[...files].forEach((file, index)=>{
			formData.append('file' + index, file);
		});
		this.props.dispatch(createBackgrounds(formData))



		// reader.onloadend = () => {
		// 	this.setState({
		// 		file: file,
		// 		imagePreviewUrl: reader.result
		// 	});
		// }
		//
		// reader.readAsDataURL(file)
	}

	_handleDelete(id){
		this.props.dispatch(deleteBackgrounds(id));
	}

	render() {
		const tbody = [];
		const {list} = this.props;
		console.log(this.props);
		list.forEach((item, key) => {
			tbody.push(
				<tr>
					<td className="ItemList__col">{key}</td>
					<td>{JSON.stringify(item)}</td>
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

							<input
								type="file"
								style={{ display: 'none' }}
								onChange={this._handleImageChange.bind(this)}
								ref='imgUpload'
								accept=".jpg, .jpeg, .png"
								multiple/>

							<Button onClick={()=>this.refs.imgUpload.click()}>Upload</Button>
							<Button onClick={this._handleDelete.bind(this, 'all')}>Delete</Button>
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
	const { list, total } = state.backgrounds;
	return {
		list,
		total
	};
})(Backgrounds);
