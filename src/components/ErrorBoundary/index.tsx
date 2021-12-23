/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:44:52
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/components/ErrorBoundary/index.tsx
 */
import React, { Component } from 'react';

interface IState {
  hasError: boolean
}

interface IProps {

}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children;
  }
}