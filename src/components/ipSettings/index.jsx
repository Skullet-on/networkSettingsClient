import React, { Component } from 'react';

export default class IpSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option:         "true",
            disabled:       true,
            ip:             '',
            mask:           '',
            gateway:        '',
            ipValid:        false,
            maskValid:      false,
            gatewayValid:   true,
            formValid:      false,
            formErrors:     {
                ip:         '',
                mask:       '',
                gateway:    ''
            }
        }
    }

    handleRadioChange(e) {
        this.setState({
            option: e.target.value,
            disabled: !this.state.disabled
        })
    }

    handleChangeField(e) {
        const name = e.target.name;
		const value = e.target.value;
        this.setState({ [name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let ipValid = this.state.ipValid;
        let maskValid = this.state.maskValid;
        let gatewayValid = this.state.gatewayValid;

        switch(fieldName) {
            case 'ip':
                ipValid = value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
                fieldValidationErrors.ip = ipValid ? '' : 'ip is not valid';
                break;
            case 'mask':
                maskValid = value.match(/^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2}|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))))$/);
                fieldValidationErrors.mask = maskValid ? '' : 'mask is not valid';
                break;
            case 'gateway':
                gatewayValid = value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^$/);
                fieldValidationErrors.gateway = gatewayValid ? '' : 'gateway is not valid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            ipValid: ipValid,
            maskValid: maskValid,
            gatewayValid: gatewayValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.ipValid && 
            this.state.maskValid && 
            this.state.gatewayValid});
		return this.state.formValid;
    }
    
    render() {
        return (
        <div className={this.props.className}>
            <div className="switcher">
                <div className="choise"><input 
                    type="radio" 
                    value="true"
                    checked={this.state.option === "true"}
                    disabled={this.props.enabledWifi}
                    onChange={(e) => {this.handleRadioChange(e)}} />Obtain an IP address authomatically (DHCP/BootP)
                </div>
                <div className="choise"><input 
                    type="radio" 
                    value="false"
                    checked={this.state.option === 'false'}
                    disabled={this.props.enabledWifi}
                    onChange={(e) => {this.handleRadioChange(e)}} />Use the following IP address:
                </div>
            </div>
            <div className="fields">
                <div className="choise">IP address: <span>*</span> <input 
                                    type="text"    
                                    name="ip"
                                    className="text_input"
                                    disabled={this.props.enabledWifi || this.state.disabled}
                                    onChange={e => this.handleChangeField(e)} />
                </div>
                <div className="choise">Subnet Mask: <span>*</span>  <input 
                                    type="text" 
                                    name="mask"
                                    className="text_input"
                                    disabled={this.props.enabledWifi || this.state.disabled}
                                    onChange={e => this.handleChangeField(e)} />
                </div>
                <div className="choise">Default Gateway: <input 
                                    type="text" 
                                    name="gateway"
                                    className="text_input"
                                    disabled={this.props.enabledWifi || this.state.disabled}
                                    onChange={e => this.handleChangeField(e)} />
                </div>
            </div>
        </div>
        )
    }
}
