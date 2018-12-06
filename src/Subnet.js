import React, { Component } from 'react';
import 'bulma/css/bulma.css'
var ip6 = require('ip6');
class Subnet extends Component {
    constructor(props) {
        super(props)
        this.state = {
          ip:this.props.match.params.ip,
          prefix:this.props.match.params.prefix,
          i:this.props.match.params.i,
          subnet:[],
          n:16,
          status:true
        }


    }
    componentWillMount(){
        let subnets = ip6.divideSubnet(this.state.ip, this.state.prefix, this.state.i,this.state.n);
        this.setState({
            subnet:subnets
        })
    }
    componentDidMount(){
        document.getElementById("original").innerHTML = ip6.normalize(this.props.match.params.ip) + "/" + this.props.match.params.prefix
        document.getElementById("s").innerHTML = ip6.normalize(this.props.match.params.ip) + "/" + this.props.match.params.i
    }
    addSubnet=()=>{
        console.log(this.state.n)
        let subnets=[]
        if(this.state.status){
            subnets = ip6.divideSubnet(this.state.ip, this.state.prefix,this.state.i,32);
        }else{
            subnets = ip6.divideSubnet(this.state.ip, this.state.prefix, this.state.i,this.state.n);
            this.setState({
                n:32
            })
        }
       
        this.setState({
            subnet:subnets,
            n:16+this.state.n,
            status:false
        })
        
    }
    renderSubnet() {
        return (
            this.state.subnet.map((row, index) => {
                return (
                    <div>
                        <span key={index}  value={index + 1}>{row}</span>
                        <br></br>
                    </div>
                )
            })
        );
    }
    render() {
        return (
            <div>
                <section>
                <section className="hero is-success">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title content">
                                Create With React
                            </h1>
                        </div>
                    </div>
                </section>
                    <div className="container">
                        <div className="column is-9 is-offset-4">
                            <h3 className="title">Subnet</h3>
                            <p id ="s"className="subtitle"></p>
                            <p className="title is-4">Original IP</p>
                            <p  className="subtitle">{this.props.match.params.ip}</p>
                            <p className="title is-4">Nomarlize IP</p>
                            <p id="original" className="subtitle"></p>
                            <p  className="subtitle">Result is limited to 16 entries</p>
                           
                            <p id="note" className="subtitle"></p>
                                {this.renderSubnet()}
                            <br></br>
                            <a className="button is-light" onClick={this.addSubnet}>Show next 16</a>
                        </div>
                    </div>
                </section>
                <br></br> <br></br> <br></br> <br></br>
            </div>
        )
    }

}
export default Subnet;
