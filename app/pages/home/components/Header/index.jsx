/**
 * 头部组件
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import { Icon, Input, message, Modal } from "antd";
import { observer, inject } from "mobx-react";
import { get } from "@utils/wdio";
import md5 from "js-md5";

const ref = new Wilddog("https://kylin.wilddogio.com/pwd");

@inject("bookMarksStore")
@observer
class Header extends React.Component {

  state = {
    value: "",
    pwd: "",
    visible: false,
  };

  componentDidMount() {
    get(ref, (pwd) => {
      this.setState({ pwd });
    });
  }

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
            if (bookMarksStore.status !== "read") {
              bookMarksStore.goDetail();
              return; 
            }
            this.setState({ visible: true });
          }}
        >
          <Icon type={bookMarksStore.status === "read" ? "tag" : "form"} />
        </a>
        <Modal
          visible={this.state.visible}
          width={300}
          title="请输入密码"
          onOk={() => {
            if (md5(this.state.value) !== this.state.pwd) {
              message.error("密码错误");
              return;
            }
            bookMarksStore.goEdit();
            this.setState({ visible: false, value: "" });
          }}
          onCancel={() => this.setState({ visible: false })}
        >
          <div>
            <Input
              value={this.state.value}
              onChange={(e) => {
                this.setState({ value: e.target.value });
              }}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Header;