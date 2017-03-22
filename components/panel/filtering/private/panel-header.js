define(['exports', 'react', '../../../button'], function (exports, _react, _button) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Header for a Filter Group within a Panel.
  */
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Panel Filter Group Header

	// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
	// Based on SLDS v2.2.0-rc.1

	// ## Dependencies

	// ### React
	var PanelFilterHeader = function PanelFilterHeader(_ref) {
		var assistiveTextCloseFilterPanel = _ref.assistiveTextCloseFilterPanel,
		    cancelLabel = _ref.cancelLabel,
		    heading = _ref.heading,
		    modified = _ref.modified,
		    onRequestCancel = _ref.onRequestCancel,
		    onRequestClose = _ref.onRequestClose,
		    onRequestSave = _ref.onRequestSave,
		    saveLabel = _ref.saveLabel;
		return modified ? _react2.default.createElement(
			'div',
			{ className: 'slds-filters__header slds-grid slds-has-divider--bottom-space slds-grid--align-spread' },
			_react2.default.createElement(_button2.default, {
				label: cancelLabel,
				onClick: onRequestCancel,
				variant: 'neutral'
			}),
			_react2.default.createElement(_button2.default, {
				label: saveLabel,
				onClick: onRequestSave,
				variant: 'brand'
			})
		) : _react2.default.createElement(
			'div',
			{ className: 'slds-filters__header slds-grid slds-has-divider--bottom-space' },
			_react2.default.createElement(
				'h2',
				{ className: 'slds-align-middle slds-text-heading--small' },
				heading
			),
			_react2.default.createElement(_button2.default, {
				className: 'slds-col--bump-left',
				assistiveText: assistiveTextCloseFilterPanel,
				iconCategory: 'utility',
				iconName: 'forward',
				iconVariant: 'bare',
				iconSize: 'small',
				onClick: onRequestClose,
				title: assistiveTextCloseFilterPanel,
				variant: 'icon'
			})
		);
	};

	PanelFilterHeader.displayName = 'SLDSPanelFilterHeader';

	PanelFilterHeader.propTypes = {
		/**
   * Localized description of the close button for the panel for screen readers
   */
		assistiveTextCloseFilterPanel: _react.PropTypes.node,
		/**
   * Label for button that cancels modified filters
   */
		cancelLabel: _react.PropTypes.string,
		/**
   * The heading of the filtering panel
   */
		heading: _react.PropTypes.node,
		/**
   * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
   */
		modified: _react.PropTypes.bool,
		/**
   * When the panel's cancel button is clicked in order to reset filter panel to previous state.
   */
		onRequestCancel: _react.PropTypes.func,
		/**
   * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
   */
		onRequestClose: _react.PropTypes.func,
		/**
   * When the panel's save button is clicked in order to confirm filter panel state.
   */
		onRequestSave: _react.PropTypes.func,
		/**
   * Label for button that saves modified filters
   */
		saveLabel: _react.PropTypes.string
	};

	exports.default = PanelFilterHeader;
});