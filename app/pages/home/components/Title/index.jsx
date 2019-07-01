/**
 * 标题组件
 * @author ranguangyu
 * @date 2019-6-29
 */

import "./index.less";
import React from "react";
import { Icon } from "antd";

class Title extends React.Component {
  static defaultProps = {
    icon: "appstore",
    name: "标题",
  };

  render() {
    const { icon, children, slotRight } = this.props;
    return (
      <div className="comp-title">
        <h3><Icon type={icon} style={{marginRight: 12}} />{children}</h3>
        <div className="slot-right">{slotRight}</div>
      </div>
    )
  }
}

export default Title;