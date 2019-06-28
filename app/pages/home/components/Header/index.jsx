/**
 * 头部组件
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import { Icon } from "antd";

class Header extends React.Component {
  render() {
    return (
      <div className="comp-header">
        <h3>
          <Icon type="ant-design" /> Bookmarks
          
        </h3>
        <a className="icon-status"><Icon type="form" /></a>
      </div>
    )
  }
}

export default Header;