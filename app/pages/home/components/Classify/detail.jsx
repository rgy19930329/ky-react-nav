/**
 * 书签分类（详情）
 * @author ranguangyu
 * @date 2019-7-1
 */

import "./index.less";
import React from "react";
import Title from "../Title";
import LinkCard from "../LinkCard";
import FolderCard from "../FolderCard";
import { Tree, Spin, Input } from "antd";
import { get } from "@utils/wdio";

const { TreeNode, DirectoryTree } = Tree;
const { Search } = Input;
const ref = new Wilddog("https://kylin.wilddogio.com/bookmarks");

let dataList = []; // 数据源

const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export default class ClassifyDetail extends React.Component {

	state = {
		treeData: [],
		expandedKeys: [],
		autoExpandParent: true,
		searchValue: "",
		loaded: false,
	};

	componentDidMount() {
		get(ref, (treeData) => {
			generateList(treeData);
			this.setState({
				treeData: treeData || [],
				expandedKeys: ["root"],
				loaded: true,
			});
		});
	}

	renderTreeNodes = (data) => {
		const { searchValue, expandedKeys, autoExpandParent } = this.state;
		console.log(searchValue)
		return data.map(item => {
			// const addTitle = (
			// 	<FolderCard
			// 		isRoot={item.key === "root"}
			// 	>
			// 		{item.title}
			// 	</FolderCard>
			// );
			const index = item.title.indexOf(searchValue);
			const beforeStr = item.title.substr(0, index);
			const afterStr = item.title.substr(index + searchValue.length);
			const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "#f50" }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
					);
			const addTitle = (
				<FolderCard
					isRoot={item.key === "root"}
				>
					{title}
				</FolderCard>
			);
			if (item.children) {
				return (
					<TreeNode
						title={addTitle}
						key={item.key}
					>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return (
				<TreeNode
					title={
						item.isLeaf ?
							(
								<LinkCard
									mode="read"
									url={item.url}
									simple
								>
									{title}
								</LinkCard>
							) : addTitle
					}
					key={item.key}
					isLeaf={item.isLeaf}
				/>
			)
		});
	};

	onChange = e => {
		const { value } = e.target;
		const { treeData } = this.state;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

	render() {
		return (
			<div className="comp-classify">
				<Title icon="apartment">分类</Title>
				<div className="comp-classify-inner">
					<Search
						style={{ marginBottom: 8, width: 300 }}
						placeholder="Search"
						onChange={this.onChange}
					/>
					<Spin spinning={!this.state.loaded}>
						<DirectoryTree
							multiple
							expandedKeys={this.state.expandedKeys}
							onExpand={(expandedKeys) => {
								this.setState({
									expandedKeys,
									autoExpandParent: false
								});
							}}
						>
							{this.renderTreeNodes(this.state.treeData)}
						</DirectoryTree>
					</Spin>
				</div>
			</div>
		)
	}
}
