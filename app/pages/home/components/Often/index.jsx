/**
 * 常用书签
 * @author ranguangyu
 * @date 2019-6-27
 */

import "./index.less";
import React from "react";
import Title from "../Title";
import LinkCard from "../LinkCard";

export default class Often extends React.Component {

	state = {
		dataSource: [
			{
				name: "哈哈哈哈哈哈哈哈哈哈哈哈",
				url: "http://www.cjs.com/",
			},
			{
				name: "百度",
				url: "http://www.baidu.com/",
			},
		],
	};

	onDelete = (url) => {
		let { dataSource } = this.state;
		dataSource = dataSource.filter(item => item.url !== url);
		this.setState({ dataSource });
	};

	render() {
		const { dataSource = [] } = this.state;
		if (dataSource.length === 0) {
			return <div></div>;
		}
		return (
			<div className="comp-often">
				<Title>常用</Title>
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
