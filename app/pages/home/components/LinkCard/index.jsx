/**
 * 链接组件
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import { Icon, Popover, Input } from "antd";
import { debounce } from "lodash";
import { set, get } from "@utils/storage";

export default class LinkCard extends React.Component {
  static defaultProps = {
    mode: "read",
    children: "默认标签",
    url: "",
    gutter: 10,
    hasClose: false,
    simple: false,
    onDelete: () => { },
    onChange: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.children,
      url: props.url,
    }

    this.handleDebounce = debounce(this.getData, 1000);
  }

  openUrl = ({ name, url }) => {
    let bookmarks = get("bookmarks") || [];
    let isFound = false; // 标签是否已经存在
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].url === url) {
        bookmarks[i]["number"] += 1;
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      bookmarks.push({ name, url, number: 1 });
      bookmarks = this.limitBookmarks(bookmarks);
    }
    set("bookmarks", bookmarks);
    window.open(url, "_blank");
  };

  /**
   * 限制 bookmarks 数量不至于过大
   */
  limitBookmarks = (bookmarks) => {
    if (bookmarks.length > 100) {
      bookmarks = bookmarks.sort((a, b) => b.number - a.number).slice(0, 7);
      return bookmarks;
    }
    return bookmarks;
  };

  getData = () => {
    const { onChange } = this.props;
    const { name, url } = this.state;
    onChange && onChange({ name, url });
  };

  render() {
    const {
      mode,
      gutter,
      hasClose,
      simple,
      onDelete,
    } = this.props;
    const { name, url } = this.state;
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
        <h5>url:</h5>
        <div>
          <Input
            value={url}
            onChange={(e) => {
              e.persist();
              this.setState({ url: e.target.value });
              this.handleDebounce();
            }}
          />
        </div>
      </div>
    );
    if (simple) {
      return (
        <div className="comp-link-card">
          {mode === "edit" ?
            <Popover
              trigger="hover"
              content={popoverContent}
            >
              <a
                className="a-link"
                onClick={() => this.openUrl({ name, url })}
              >
                <Icon type="paper-clip" /> {name}
              </a>
            </Popover>
            :
            <a
              className="a-link"
              onClick={() => this.openUrl({ name, url })}
            >
              <Icon type="paper-clip" /> {name}
            </a>
          }
        </div>
      )
    }
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
              content={popoverContent}
            >
              <a
                className="a-link"
                onClick={() => this.openUrl({ name, url })}
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
              onClick={() => this.openUrl({ name, url })}
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
