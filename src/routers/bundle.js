import { Component } from 'react'
import { loading } from '../actions/rootActions'
import { connect } from 'react-redux'
class Bundle extends Component {
  constructor(props) {
      super(props);
      this.state = {
          mod: null
      };
  }
  unmount = false
  componentDidMount = () => {
    this.props.dispatch(loading(true))
    this.load(this.props)
  }
  componentWillUnmount = () => {
    this.unmount = true
  }
  
  componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
          this.load(nextProps)
      }
  }
  load(props) {
      if (this.state.mod) {
          return true
      }
      //注意这里，使用Promise对象; mod.default导出默认
      props.load().then((mod) => {
          if (this.unmount) {
              this.props.dispatch(loading(false))
              return false
          }
          this.setState({
              mod: mod.default ? mod.default : mod
          }, _ => {
            this.props.dispatch(loading(false))
          });
      });
  }

  render() {
      return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

// 拉入dispatch
export default connect()(Bundle)