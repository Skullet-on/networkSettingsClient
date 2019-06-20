import React, { Component } from 'react';
import IpSettings from '../ipSettings';
import DnsSettings from '../dnsSettings';

export default class WirelessSettings extends Component {
    constructor(props) {
      super(props)
      this.state = {
         enabledWifi:      false,
         enabledSecurity:  false,
         wifiList: []
      }
    }

    componentDidMount() {
		this.getData()
	}

    getData(){
		fetch('/wifis')
			.then(res => res.json())
			.then(wifis => this.setState({ wifiList: wifis }))
			.catch(err => console.error(err.message))
    }
    
    list(){
		let list = this.state.wifiList.map((wifi, item) =>{
			return <option key={item}>{wifi.name}</option>;
		})
		return list;
	}


    handleEnableWifi(e) {
        this.state.enabledWifi ? 
            this.setState({
                enabledWifi: false,
                enabledSecurity: false
            }) : 
            this.setState({
                enabledWifi: true
            })
    }

    handleEnableSecurity(e) {
        this.setState({
            enabledSecurity: !this.state.enabledSecurity
        })
    }
    
    render() {
        return (
        <div className="wireless_settings">
            <b>Wireless Settings</b>
            <div className="wifi_settings">
                <div className="switcher">
                    <div className="choise">
                        <input 
                            type="checkbox"
                            checked={this.state.enabledWifi}
                            onChange={(e) => {this.handleEnableWifi(e)}} /> Enable wifi:
                    </div>
                </div>
                <div className="fields">
                    <div className="choise">
                        Wireless Network Name: <span>*</span> <select disabled={!this.state.enabledWifi} className="select_input">
                            <option hidden disabled selected value>Please select</option>
                            { this.list() }
                        </select><input type="button" className="refresh"/>
                    </div>
                </div>
                <div className="switcher">
                    <div className="choise">
                        <input 
                            type="checkbox"
                            checked={this.state.enabledSecurity}
                            disabled={!this.state.enabledWifi}
                            onChange={(e) => {this.handleEnableSecurity(e)}} /> Enable Wireless Security:
                    </div>
                </div>
                <div className="fields">
                    <div className="choise">
                        Security key: <span>*</span> <input type="text" className="text_input" disabled={!this.state.enabledSecurity} />
                    </div>
                </div>
            </div>
            <IpSettings enabledWifi={!this.state.enabledWifi} className="wireless_settings_ip" />
            <DnsSettings enabledWifi={!this.state.enabledWifi} className="wireless_settings_ip" />
        </div>
        )
    }
}
