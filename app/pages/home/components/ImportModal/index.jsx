/**
 * 数据导入弹窗 组件
 * @author ranguangyu
 * @date 2019-7-1
 */

import React from "react";
import { Modal, Input, message } from "antd";

const { TextArea } = Input;

class ImportModal extends React.Component {

  state = {
    json: "",
  }

  handleOk = () => {
    const { json } = this.state;
    try {
      let treeData = JSON.parse(json);
      if (Array.isArray(treeData)) {
        if (treeData.length === 1) {
          if (treeData[0].key === "root") {
            this.props.onChange(treeData);
            this.props.onCancel();
          } else {
            message.error("根节点元素key值只为root");
          }
        } else {
          message.error("根目录有仅只能有一个元素");
        }
      } else {
        message.error("最外层必须为数组");
      }
    } catch(e) {
      message.error(e.toString());
    }
  };

  render() {
    return (
      <Modal
        title="导入标签结构（JSON）"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
      >
        <TextArea
          placeholder="请导入数据"
          rows={10}
          value={this.state.json}
          onChange={(e) => {
            this.setState({ json: e.target.value });
          }}
        />
      </Modal>
    )
  }
}

export default ImportModal;