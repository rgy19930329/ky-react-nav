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
import { Tree, Spin } from "antd";
import { get } from "@utils/wdio";

const { TreeNode, DirectoryTree } = Tree;
const ref = new Wilddog("https://kylin.wilddogio.com/bookmarks");

export default class ClassifyDetail extends React.Component {

	state = {
		treeData: [],
		expandedKeys: [],
		loaded: false,
	};

	componentDidMount() {
		get(ref, (treeData) => {
			this.setState({
				treeData,
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

	render() {
		return (
			<div className="comp-classify">
				<Title icon="apartment">分类</Title>
				<div className="comp-classify-inner">
					<Spin spinning={!this.state.loaded}>
					<DirectoryTree
						multiple
						expandedKeys={this.state.expandedKeys}
						onExpand={(expandedKeys) => {
							this.setState({ expandedKeys });
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