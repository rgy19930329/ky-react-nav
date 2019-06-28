/**
 * 书签分类
 * @author ranguangyu
 * @date 2019-6-28
 */

import "./index.less";
import React from "react";
import { Icon } from "antd";
import LinkCard from "../LinkCard";

export default class Classify extends React.Component {
	render() {
		return (
			<div className="comp-classify">
        <h3><Icon type="appstore" /> 分类</h3>
				<div className="comp-classify-inner">
          <LinkCard
						mode="edit"
						onChange={({ name, url }) => {
							console.log(name, url);
						}}
					>
						qweqwqwe
					</LinkCard>
        </div>
			</div>
		)
	}
}
