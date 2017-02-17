/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Implements the [Button Stateful design pattern](https://lightningdesignsystem.com/components/buttons/#flavor-stateful) in React.
// Based on SLDS v2.1.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### omit
import omit from 'lodash.omit';

// ## Children
import ButtonIcon from '../icon/button-icon';
import TooltipTrigger from '../popover-tooltip/trigger';

import { BUTTON_STATEFUL } from '../../utilities/constants';


const propTypes = {
	/**
	 * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
	 */
	active: PropTypes.bool,
	/**
	 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
	 * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
	 */
	assistiveText: PropTypes.string,
	disabled: PropTypes.bool,
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
	 */
	inverse: PropTypes.bool,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	onFocus: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyPress: PropTypes.func,
	onKeyUp: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	/**
	 * If true, button scales to 100% width on small form factors.
	 */
	responsive: PropTypes.bool,
	/**
	 * Initial label and icon (optional) of button.
	 */
	stateOne: PropTypes.object,
	/**
	 * Selected label and icon (optional) of button.
	 */
	stateTwo: PropTypes.object,
	/**
	 *	Deselect label and icon (optional) of button.
	 */
	stateThree: PropTypes.object,
	/**
	 * Write "-1" if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
	tooltip: PropTypes.node,
	variant: PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon'])
};

// i18n
const defaultProps = {
	disabled: false,
	iconSize: 'medium',
	responsive: false,
	stateOne: { iconName: 'add', label: 'Follow' },
	stateTwo: { iconName: 'check', label: 'Following' },
	stateThree: { iconName: 'close', label: 'Unfollow' }
};

/**
 * The ButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
 * For icon buttons, use <code>variant='icon'</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: 'add', label: 'Join'}}</code>).
 */
class ButtonStateful extends TooltipTrigger {
	constructor (props) {
		super(props);
		this.state = { active: false };
	}

	componentDidMount () {
		super.componentDidMount();
	}

	componentWillUnmount () {
		super.componentWillUnmount();
	}

	handleClick (e) {
		if (isFunction(this.props.onClick)) this.props.onClick(e);
		if (!isBoolean(this.props.active)) this.setState({ active: !this.state.active });
	}

	handleBlur(e) {
		if(this.props.onBlur) this.props.onBlur(e);
		e.currentTarget.blur();
	}

	getClassName (active) {
		return classNames(this.props.className, 'slds-button', {
			'slds-button--neutral': this.props.variant !== 'icon',
			'slds-button--inverse': this.props.variant === 'inverse',
			'slds-not-selected': !active,
			'slds-is-selected': active,
			'slds-max-small-button--stretch': this.props.responsive,
			'slds-button--icon-border': this.props.variant === 'icon'
		});
	}

	render () {
		const {
			active,
			assistiveText,
			disabled,
			iconName,
			iconSize,
			id,
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			stateOne,
			stateTwo,
			stateThree,
			tabIndex,
			variant
		} = this.props;

		const isActive = isBoolean(active) ? active : this.state.active;

		if (variant === 'icon') {
			return (
				<button
					aria-live="polite"
					className={this.getClassName(isActive)}
					disabled={disabled}
					id={id}
					onBlur={this.handleBlur.bind(this)}
					onClick={this.handleClick.bind(this)}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					onKeyPress={onKeyPress}
					onKeyUp={onKeyUp}
					onMouseDown={onMouseDown}
					onMouseEnter={onMouseEnter}
					onMouseLeave={this.handleBlur.bind(this)}
					tabIndex={tabIndex}
				>
					<ButtonIcon
						assistiveText={isActive ? `${assistiveText} selected` : assistiveText}
						disabled={disabled}
						name={iconName}
						size={iconSize}
						className="slds-button__icon--stateful"
					/>
					{this.getTooltip()}
				</button>
			);
		}

		return (
			<button
				aria-live="assertive"
				className={this.getClassName(isActive)}
				disabled={disabled}
				id={id}
				onBlur={this.handleBlur.bind(this)}
				onClick={this.handleClick.bind(this)}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onKeyUp={onKeyUp}
				onMouseEnter={onMouseEnter}
				onMouseLeave={this.handleBlur.bind(this)}
				tabIndex={tabIndex}
			>
				<span className="slds-text-not-selected">
					<ButtonIcon
						disabled={disabled}
						name={stateOne.iconName}
						size="small"
						position="left"
						className="slds-button__icon--stateful"
					/>
					{stateOne.label}
				</span>
				<span className="slds-text-selected">
					<ButtonIcon
						disabled={disabled}
						name={stateTwo.iconName}
						size="small"
						position="left"
						className="slds-button__icon--stateful"
					/>
					{stateTwo.label}
				</span>
				<span className="slds-text-selected-focus">
					<ButtonIcon
						disabled={disabled}
						name={stateThree.iconName}
						size="small"
						position="left"
						className="slds-button__icon--stateful"
					/>
					{stateThree.label}
				</span>
				{this.getTooltip()}
			</button>
		);
	}
}

ButtonStateful.displayName = BUTTON_STATEFUL;
ButtonStateful.propTypes = propTypes;
ButtonStateful.defaultProps = defaultProps;

module.exports = ButtonStateful;