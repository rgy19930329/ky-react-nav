/**
 * 头部组件
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import { Icon } from "antd";
import { observer, inject } from "mobx-react";

@inject("bookMarksStore")
@observer
class Header extends React.Component {
  render() {
    const { bookMarksStore } = this.props;
    return (
      <div className="comp-header">
        <h3>
          <Icon type="ant-design" /> Bookmarks
        </h3>
        <a
          className="icon-status"
          onClick={() => {
            if (bookMarksStore.status === "read") {
              bookMarksStore.goEdit();
            } else {
              bookMarksStore.goDetail();
            }
          }}
        >
          <Icon type={bookMarksStore.status === "read" ? "tag" : "form"} />
        </a>
      </div>
    )
  }
}

export default Header;