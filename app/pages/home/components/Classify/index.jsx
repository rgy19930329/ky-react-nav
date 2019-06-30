/**
 * 书签分类
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import Title from "../Title";
import LinkCard from "../LinkCard";
import FolderCard from "../FolderCard";
import { Tree } from "antd";
import mock from "./data";
import uuid from "node-uuid";

const { treeData } = mock;

const { TreeNode, DirectoryTree } = Tree;

export default class Classify extends React.Component {

	state = {
		treeData: [],
		expandedKeys: [],
	};

	componentDidMount() {
		this.setState({ treeData, expandedKeys: ["root"] });
	}

	/**
	 * 根据key搜索tree，找到相应节点并执行回调方法
	 */
	dfs = (tree, key, callback) => {
		for (var i = 0; i < tree.length; i++) {
			if (tree[i].key === key) {
				callback && callback(tree, i);
				break;
			}
			if (tree[i].children && tree[i].children.length > 0) {
				this.dfs(tree[i].children, key, callback);
			}
		}
		return tree;
	};

	/**
	 * 新增链接
	 */
	addLink = (key) => {
		let { treeData, expandedKeys } = this.state;
		treeData = this.dfs(treeData, key, (tree, i) => {
			if (!tree[i].children) {
				tree[i].children = [];
			}
			tree[i].children.push({
				title: "标签",
				url: "",
				key: uuid.v4(),
				isLeaf: true
			});
		});
		expandedKeys.indexOf(key) === -1 && expandedKeys.push(key);
		this.setState({ treeData, expandedKeys });
		this.onTreeChange(treeData);
	};

	/**
	 * 新增文件夹
	 */
	addFolder = (key) => {
		let { treeData, expandedKeys } = this.state;
		treeData = this.dfs(treeData, key, (tree, i) => {
			if (!tree[i].children) {
				tree[i].children = [];
			}
			tree[i].children.push({
				title: "文件夹",
				key: uuid.v4(),
			});
		});
		expandedKeys.indexOf(key) === -1 && expandedKeys.push(key);
		this.setState({ treeData, expandedKeys });
		this.onTreeChange(treeData);
	};

	/**
	 * 删除一项（文件夹 或 链接）
	 */
	delOneItem = (key) => {
		let { treeData } = this.state;
		treeData = this.dfs(treeData, key, (tree, i) => {
			tree.splice(i, 1);
		});
		this.setState({ treeData });
		this.onTreeChange(treeData);
	};

	/**
	 * 更新文件夹name
	 */
	updateFolder = (key, { name }) => {
		let { treeData } = this.state;
		treeData = this.dfs(treeData, key, (tree, i) => {
			tree[i].title = name;
		});
		this.setState({ treeData });
		this.onTreeChange(treeData);
	};

	/**
	 * 更新链接name和url
	 */
	updateLink = (key, { name, url }) => {
		let { treeData } = this.state;
		treeData = this.dfs(treeData, key, (tree, i) => {
			tree[i].title = name;
			tree[i].url = url;
		});
		this.setState({ treeData });
		this.onTreeChange(treeData);
	};

	/**
	 * 监听树的变化
	 */
	onTreeChange = (treeData) => {
		console.log(treeData);
	};

	renderTreeNodes = (data) => {
		return data.map(item => {
			const addTitle = (
				<FolderCard
					isRoot={item.key === "root"}
					addFolder={() => this.addFolder(item.key)}
					addLink={() => this.addLink(item.key)}
					delFolder={() => this.delOneItem(item.key)}
					onChange={({ name }) => {
						console.log(name);
						this.updateFolder(item.key, { name });
					}}
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
									mode="edit"
									url={item.url}
									simple
									onChange={({ name, url }) => {
										console.log(name, url);
										this.updateLink(item.key, { name, url });
									}}
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

	render() {
		return (
			<div className="comp-classify">
				<Title>分类</Title>
				<div className="comp-classify-inner">
					<DirectoryTree
						multiple
						expandedKeys={this.state.expandedKeys}
						onExpand={(expandedKeys) => {
							this.setState({ expandedKeys });
						}}
					>
						{this.renderTreeNodes(this.state.treeData)}
					</DirectoryTree>
				</div>
			</div>
		)
	}
}