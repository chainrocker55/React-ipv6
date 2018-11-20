import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import ScriptCalculate from './ScriptCalculate'
import { Link } from 'react-router-dom'
var Address6 = require('ip-address').Address6;
var address
var ip6 = require('ip6');

var BigNumber = require('big-number');

class Script extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prefix: [],
            subnet: [],
            check: false,
            ip: "",
            nPrefix: 64,
            hide: true
        }

        this.runPrefix = this.runPrefix.bind(this)
        this.renderPrefix = this.renderPrefix.bind(this)
        this.checkIP = this.checkIP.bind(this)
    }
    componentWillMount() {
        this.runPrefix()
    }

    handleClick = (event) => {
        var ip = this.state.ip
        var prefix = this.state.nPrefix
        var i = event.target.value
        this.props.history.push(`/subnet/${ip}/${prefix}/${i}`)
    };

    runPrefix() {
        var arr = []
        for (var i = 1; i < 129; i++) {
            var number;
            var n
            if (i < 64) {
                n = BigNumber(2).power(64 - i)
                number = i + " (" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " network/64 )";
            } else {
                n = BigNumber(2).power(128 - i)
                number = i + " (" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " addresses )";

            }
            arr.push(number)
        }
        this.setState({
            prefix: arr
        })
    }
    renderPrefix() {
        return (
            this.state.prefix.map((row, index) => {
                return (
                    <option key={index} value={index + 1}>{row}</option>
                )
            })
        );
    }
    renderSubnet() {
        return (
            this.state.subnet.map((row, index) => {
                return (
                    <div>
                        <button className=" button is-white" key={index} onClick={this.handleClick} value={index + this.state.nPrefix + 1}>{row}</button >
                    </div>
                )
            })
        );
    }

    checkIP() {
        var ip = document.getElementById("ip").value
        var prefix = parseInt(document.getElementById("prefix").value)
        address = new Address6(ip);


        console.log(address.isValid())
        if (address.isValid()) {
            document.getElementById("error").innerHTML = null
            var range = ip6.range(ip, prefix, 128)
            var fullIP = ip6.normalize(ip)
            var network = ip6.abbreviate(range.start)
            var dot = address.toByteArray()
            var hex = "0x" + address.getBitsBase16(0, 128)
            var strIP = address.getBitsBase16(0, 128)
            console.log(fullIP)
            console.log(range)

            var total = BigNumber(0)
            for (var i = 0; i < strIP.length; i++) {
                if (strIP.substring(i, i + 1) !== '0') {
                    var n = 32 - i - 1
                    total.plus(BigNumber(16).power(n).multiply(strIP.substring(i, i + 1)))
                }

            }
            var num = 128 - prefix;
            var totolIP = BigNumber(2).power((num)).toString()

            document.getElementById("ipAddress").innerHTML = ip + "/" + prefix
            document.getElementById("network").innerHTML = network
            document.getElementById("prefixLength").innerHTML = prefix
            document.getElementById("networkLengthStart").innerHTML = range.start + " -"
            document.getElementById("networkLengthEnd").innerHTML = range.end
            document.getElementById("fullIP").innerHTML = fullIP
            document.getElementById("dotIP").innerHTML = dot.join(":")
            document.getElementById("hexIP").innerHTML = hex
            document.getElementById("integerIP").innerHTML = total.toString()
            document.getElementById("totalIP").innerHTML = totolIP.toString()

            var arr = []

            for (var ii = prefix + 1, j = 1; ii <= 128; ii++ , j++) {
                var x = BigNumber(2).power(j).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " networks /" + ii
                arr.push(x)
            }
            this.setState({
                subnet: arr,
                check: true,
                ip: ip,
                nPrefix: prefix
            })



        } else {
            document.getElementById("error").innerHTML = "IP is not IPV6"
        }
    }

    render() {
        return (
            <div>
                <section className="hero is-success">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title content">
                                Create With React
                </h1>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="hero-body">
                        <div className="container ">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">IPV6</h3>
                                <div className="box">
                                    <form>
                                        <div className="field">
                                            <p>IP Address</p>
                                            <div className="control">
                                                <input id="ip" className="input" placeholder="IP Address" autoFocus=""></input>
                                            </div>
                                            <p className="help is-danger subtitle" id="error"></p>
                                        </div>
                                        <div className="field">
                                            <p>Prefix length</p>
                                            <select aria-label="Prefix length" id="prefix" title="Prefix length" className="button">
                                                {this.renderPrefix()}
                                            </select>
                                        </div>

                                        <div className="field">
                                            <div className="button is-success is-fullwidth is-large" onClick={this.checkIP}>Calculate</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ScriptCalculate />
                <section>
                    <div className="container">
                        <div className="column is-9 is-offset-4">
                            <h3 className="title has-text-grey">Subnet</h3>

                            {this.renderSubnet()}

                        </div>
                    </div>
                </section>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <footer className="footer">
                    <div className="content has-text-centered">
                        <p>
                            <strong>59160545</strong> by <a>Kachain Jantalat</a>
                        </p>
                    </div>
                </footer>

            </div>
        )
    }

}
export default Script;