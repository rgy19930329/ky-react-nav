/**
 * 文件夹组件
 * @author ranguangyu
 * @date 2019-6-30
 */

import "./index.less";
import React from "react";
import { Icon, Popover, Input } from "antd";
import { debounce } from "lodash";

export default class FolderCard extends React.Component {
  static defaultProps = {
    mode: "read",
    isRoot: false,
    children: "文件夹",
    addFolder: () => { },
    addLink: () => { },
    delFolder: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.children,
    }

    this.handleDebounce = debounce(this.getData, 1000);
  }

  getData = () => {
    const { onChange } = this.props;
    const { name } = this.state;
    onChange && onChange({ name });
  };

  render() {
    const { mode, isRoot, addFolder, addLink, delFolder } = this.props;
    const { name } = this.state;
    if (mode === "read") {
      return (
        <div className="comp-folder-card">
          {name}
        </div>
      )
    }
    const popoverContent = (
      <div>
        <h5>name:</h5>
        <div>
          <Input
            value={name}
            onChange={(e) => {
              e.persist();
              this.setState({ name: e.target.value });
              this.handleDebounce();
            }}
          />
        </div>
      </div>
    );
    return (
      <div className="comp-folder-card">
        <Popover
          trigger="hover"
          content={popoverContent}
        >
          {name}
        </Popover>
        {addFolder &&
          <a
            style={{ marginLeft: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              addFolder();
            }}
            title="添加文件夹"
          >
            <Icon type="plus-square" />
          </a>
        }
        {addLink &&
          <a
            style={{ marginLeft: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              addLink();
            }}
            title="添加链接"
          >
            <Icon type="plus" />
          </a>
        }
        {delFolder && !isRoot &&
          <a
            style={{ marginLeft: 10 }}
            className="icon-delete"
            onClick={(e) => {
              e.stopPropagation();
              delFolder();
            }}
            title="删除文件夹"
          >
            <Icon type="close-circle" />
          </a>
        }
      </div>
    )
  }
}
