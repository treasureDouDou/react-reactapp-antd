import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { verifyLogin, loading } from '../../actions/rootActions'
import styles from './login.less'
import { connect } from 'react-redux'
const FormItem = Form.Item
class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.userName !== 'doudou' || values.passWrod !== 'doudou') {
          message.error('密码不正确');
          return false
        }
        this.props.dispatch(loading(true))
        this.props.dispatch(
          verifyLogin({
            isLogin: true,
            user: values
          })
        )
        setTimeout(() => {
          this.props.history.push('/admin/home')
        }, 2000)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.login}>
        <div className={styles['login-warp']}>
          <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
            <FormItem 
            hasFeedback
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入您的账号' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入您的账号"
                />
              )}
            </FormItem>
            <FormItem
            hasFeedback
            >
              {getFieldDecorator('passWrod', {
                rules: [{ required: true, message: '请输入您的密码' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="请输入您的密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className={styles['login-form-forgot']} href="">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className={styles['login-form-button']}
              >
                登录
              </Button>
              <div className={styles.user}>
                Username: doudou
                <span>
                  Password: doudou
                </span>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default connect()(WrappedNormalLoginForm)
