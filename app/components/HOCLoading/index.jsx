/**
 * HOC loading 组件
 * @author ranguangyu
 * @date 2019-01-30
 */

import React from "react";
import { Spin, Icon } from "antd";

export default mode => WrappedComponent => class extends WrappedComponent {
  render() {
    mode = mode || "part";
    if (mode === "part") {
      return !this.state.loaded ?
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 20 }} spin />}
          spinning={!this.state.loaded}
        /> :
        super.render();
    } else if (mode === "all") {
      return (
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 20 }} spin />}
          spinning={!this.state.loaded}
        >
          {super.render()}
        </Spin>
      )
    } else {
      return super.render();
    }
  }
}
