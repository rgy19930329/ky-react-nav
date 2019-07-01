/**
 * 常用书签
 * @author ranguangyu
 * @date 2019-6-27
 */

import "./index.less";
import React from "react";
import { Icon, message } from "antd";
import Title from "../Title";
import LinkCard from "../LinkCard";
import { set, get, remove } from "@utils/storage";

export default class Often extends React.Component {

	state = {
		dataSource: [],
	};

	componentDidMount() {
		let bookmarks = get("bookmarks") || [];
		bookmarks = bookmarks.sort((a, b) => b.number - a.number);
		let dataSource = [];
		if (bookmarks.length > 7) {
			dataSource = bookmarks.slice(0, 7);
		} else {
			dataSource = bookmarks;
		}
		this.setState({ dataSource });
	}

	/**
	 * 删除标签
	 */
	onDelete = (url) => {
		let { dataSource } = this.state;
		dataSource = dataSource.filter(item => item.url !== url);
		this.setState({ dataSource });
		// 修改 localStorage
		let bookmarks = get("bookmarks");
		let index = -1;
		for (let i = 0, len = bookmarks.length; i < len; i++) {
			if (bookmarks[i].url === url) {
				index = i;
				break;
			}
		}
		if (index >= 0) {
			bookmarks.splice(index, 1);
		}
		set("bookmarks", bookmarks);
	};

	/**
	 * 清除缓存
	 */
	clearCache = () => {
		remove("bookmarks");
		message.success("操作成功");
	};

	render() {
		const { dataSource = [] } = this.state;
		if (dataSource.length === 0) {
			return <div></div>;
		}
		return (
			<div className="comp-often">
				<Title
					icon="book"
					slotRight={(
						<a
							title="清除缓存"
							onClick={this.clearCache}
							style={{ position: "relative", top: 10 }}
						>
							<Icon type="delete" style={{ fontSize: 20 }} />
						</a>
					)}
				>
					常用
				</Title>
				<div className="comp-often-list">
					{dataSource.map(item => {
						const { name, url } = item;
						return (
							<LinkCard
								url={url}
								key={url}
								onDelete={this.onDelete}
								hasClose
							>{name}</LinkCard>
						)
					})}
        </div>
			</div>
		)
	}
}
