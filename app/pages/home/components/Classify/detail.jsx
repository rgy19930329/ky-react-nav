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
		const { key, title, isLeaf } = node;
		isLeaf && dataList.push({ key, title, isLeaf });
    if (node.children) {
      generateList(node.children);
    }
  }
};

export default class ClassifyDetail extends React.Component {

	state = {
		treeData: [],
		searchData: [{ key: "root", title: "书签栏", children: [] }],
		expandedKeys: [],
		number: 0,
		searchValue: "",
		loaded: false,
	};

	componentDidMount() {
		get(ref, (treeData) => {
			generateList(treeData);
			this.setState({
				treeData: treeData || [],
				number: dataList.length,
				expandedKeys: ["root"],
				loaded: true,
			});
		});
	}

	renderTreeNodes = (data) => {
		return data.map(item => {
			const addTitle = (
				<FolderCard
					isRoot={item.key === "root"}
				>
					{item.title}
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
									{item.title}
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
		const tempList = dataList.filter(item => item.title.match(new RegExp(value, "i")));
		const searchData = [{ key: "root", title: "书签栏", children: tempList }];

    this.setState({
			expandedKeys: ["root"],
			searchData,
			searchValue: value,
    });
  };

	render() {
		const { searchValue, treeData, searchData, expandedKeys, number } = this.state;
		return (
			<div className="comp-classify">
				<Title icon="apartment">分类 （共 {number} 条）</Title>
				<div className="comp-classify-inner">
					<Search
						style={{ marginBottom: 8, width: 300 }}
						placeholder="Search"
						allowClear
						onChange={this.onChange}
					/>
					{searchValue && (
						<span style={{marginLeft: 10}}>
							检索出 {searchData[0].children.length} 条记录
						</span>
					)}
					<Spin spinning={!this.state.loaded}>
						<DirectoryTree
							multiple
							expandedKeys={expandedKeys}
							onExpand={(expandedKeys) => {
								this.setState({
									expandedKeys,
								});
							}}
						>
							{this.renderTreeNodes(searchValue ? searchData : treeData)}
						</DirectoryTree>
					</Spin>
				</div>
			</div>
		)
	}
}
