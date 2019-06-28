/**
 * 头部组件
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import { Icon, Popover, Input } from "antd";

export default class LinkCard extends React.Component {
  static defaultProps = {
    mode: "read",
    children: "默认标签",
    url: "https://www.baidu.com",
    gutter: 10,
    hasClose: false,
    onDelete: () => { },
    onChange: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.children,
      url: props.url,
    }
  }

  openUrl = (url) => {
    window.open(url, "_blank");
  };

  render() {
    const {
      mode,
      gutter,
      hasClose,
      onDelete,
      onChange,
    } = this.props;
    const { name, url } = this.state;
    const pd = Math.floor(gutter / 2);
    if (mode === "edit") {
      return (
        <div
          className="comp-link-card"
          style={{ paddingLeft: pd, paddingRight: pd }}
        >
          <div className="comp-link-card-inner">
            <Popover
              trigger="hover"
              content={(
                <div>
                  <h5>name:</h5>
                  <div><Input value={name} onChange={(e) => {
                    this.setState({ name: e.target.value });
                    onChange && onChange({ name: e.target.value, url });
                  }} /></div>
                  <h5>url:</h5>
                  <div><Input value={url} onChange={(e) => {
                    this.setState({ url: e.target.value });
                    onChange && onChange({ name, url: e.target.value });
                  }} /></div>
                </div>
              )}
            >
              <a
                className="a-link"
                onClick={() => this.openUrl(url)}
              >
                <Icon type="paper-clip" /> {name}
              </a>
            </Popover>
            <a className="a-close" onClick={() => onDelete(url)}>
              <Icon type="close-circle" theme="filled" />
            </a>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="comp-link-card"
          style={{ paddingLeft: pd, paddingRight: pd }}
        >
          <div className="comp-link-card-inner">
            <a
              title={name}
              className="a-link"
              onClick={() => this.openUrl(url)}
            >
              <Icon type="paper-clip" /> {name}
            </a>
            {hasClose &&
              <a className="a-close" onClick={() => onDelete(url)}>
                <Icon type="close-circle" theme="filled" />
              </a>
            }
          </div>
        </div>
      )
    }
  }
}
