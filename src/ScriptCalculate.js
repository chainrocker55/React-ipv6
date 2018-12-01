import React, { Component } from 'react';
import 'bulma/css/bulma.css'
class ScriptCalculate extends Component {
    render() {
        return (
            <div>
                <section id="hide" style={{ display: (this.props.showing ? 'block' : 'none') }}>
                    <div className="container">
                        <div className="column is-9 is-offset-4">
                            <h3 className="title has-text-grey">Calculated</h3>
                            <table className="table is-bordered ">
                                <tbody>
                                    <tr>
                                        <td>IP address</td>
                                        <td id="ipAddress"></td>
                                    </tr>

                                    <tr>
                                        <td>Network</td>
                                        <td id="network"></td>
                                    </tr>

                                    <tr>
                                        <td>Prefix length</td>
                                        <td id="prefixLength"></td>
                                    </tr>

                                    <tr>
                                        <td>Network range</td>
                                        <td id="networkLengthStart"></td>

                                    </tr>
                                    <tr>
                                        <td></td>

                                        <td id="networkLengthEnd"></td>
                                    </tr>

                                    <tr>
                                        <td>Total IP addresses</td>
                                        <td id="totalIP"></td>
                                    </tr>

                                    <tr>
                                        <td>IP address (full)</td>
                                        <td id="fullIP"></td>
                                    </tr>

                                    <tr>
                                        <td>Integer ID</td>
                                        <td id="integerIP"></td>
                                    </tr>

                                    <tr>
                                        <td>Hexadecimal ID</td>
                                        <td id="hexIP"></td>
                                    </tr>

                                    <tr>
                                        <td>Dotted decimal ID</td>
                                        <td id="dotIP"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}
export default ScriptCalculate;
