import React from 'react';
import Field from '../Field';
import { GlyphButton, FormInput } from '../../../admin/client/App/elemental';

module.exports = Field.create({
	displayName: 'URLField',
	statics: {
		type: 'Url',
	},
	openValue () {
		var href = this.props.value;
		if (!href) return;
		if (!/^(mailto\:)|(\w+\:\/\/)/.test(href)) {
			href = 'http://' + href;
		}
		window.open(href);
	},
	renderLink () {
		if (!this.props.value) return null;

		return (
			<GlyphButton
				className="keystone-relational-button"
				glyph="link"
				onClick={this.openValue}
				title={'Open ' + this.props.value + ' in a new tab'}
				variant="link"
			/>
		);
	},
	renderField () {
		return (
			<FormInput
				autoComplete="off"
				name={this.getInputName(this.props.path)}
				onChange={this.valueChanged}
				ref="focusTarget"
				type="url"
				value={this.props.value}
				disabled={this.props.disabled}
			/>
		);
	},
	wrapField () {
		return (
			<div style={{ position: 'relative' }}>
				{this.renderField()}
				{this.renderLink()}
			</div>
		);
	},
	renderValue () {
		const { value, disabled } = this.props;
		return (
			<FormInput noedit onClick={value && this.openValue} disabled={disabled}>
				{value}
			</FormInput>
		);
	},
});
