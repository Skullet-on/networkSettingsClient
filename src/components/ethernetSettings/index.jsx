import React, { Component } from 'react';
import IpSettings from '../ipSettings';
import DnsSettings from '../dnsSettings';

export default class EthernetSettings extends Component {
  render() {
    return (
        <div className="ethernet_settings">
            <b>Ethernet settings</b>
            <IpSettings className="ethernet_settings_ip" />
            <DnsSettings className="ethernet_settings_dns" />
        </div>
    )
  }
}
