/**
 * 我的导航
 * @author ranguangyu
 * @date 2019-6-27
 */

import "./index.less";
import React from "react";
import { Icon } from "antd";

export default class Home extends React.Component {
	render() {
		return (
			<div className="page-home">
				<a className="icon-status"><Icon type="form" /></a>
				<h3 className="tc">
					<Icon type="ant-design" /> 我的导航
				</h3>
			</div>
		)
	}
}
