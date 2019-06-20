import React, { Component } from 'react';

export default class DnsSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option:         'obtain',
            disabled:       true,
            preferredDns:   '',
            alternativeDns: '',
            preferredDnsValid:        false,
            alternativeDnsValid:   true,
            formValid:      false,
            formErrors:     {
                preferredDns:         '',
                alternativeDns:       ''
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
        let preferredDnsValid = this.state.preferredDnsValid;
        let alternativeDnsValid = this.state.alternativeDnsValid;

        switch(fieldName) {
            case 'ip':
                preferredDnsValid = value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
                fieldValidationErrors.preferredDns = preferredDnsValid ? '' : 'preferredDns is not valid';
                break;
            case 'gateway':
                alternativeDnsValid = value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^$/);
                fieldValidationErrors.alternativeDns = alternativeDnsValid ? '' : 'alternativeDns is not valid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            ipValid: preferredDnsValid,
            alternativeDnsValid: alternativeDnsValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.preferredDnsValid && 
            this.state.alternativeDnsValid});
		return this.state.formValid;
    }
    
    render() {
        return (
        <div className={this.props.className}>
            <div className="switcher">
                <div className="choise"><input 
                    type="radio" 
                    value="obtain"
                    checked={this.state.option === 'obtain'}
                    disabled={this.props.enabledWifi}
                    onChange={(e) => {this.handleRadioChange(e)}} />Obtain DNS server authomatically
                </div>
                <div className="choise"><input 
                    type="radio" 
                    value="following"
                    disabled={this.props.enabledWifi}
                    checked={this.state.option === 'following'}
                    onChange={(e) => {this.handleRadioChange(e)}} />Use the following DNS server:
                </div>
            </div>
            <div className="fields">
                <div className="choise">
                    Preferred DNS server: <span>*</span> <input 
                        type="text"    
                        name="ip" 
                        className="text_input"
                        disabled={this.props.enabledWifi || this.state.disabled}
                        onChange={e => this.handleChangeField(e)} />
                </div>
                <div className="choise">
                    Alternative DNS server: <input 
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
