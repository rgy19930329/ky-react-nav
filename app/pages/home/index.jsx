/**
 * 我的书签
 * @author ranguangyu
 * @date 2019-6-27
 */

import "./index.less";
import React from "react";
import Header from "./components/Header";
import Often from "./components/Often";
import Classify from "./components/Classify";

export default class Home extends React.Component {
	render() {
		return (
			<div className="page-home">
				<Header />
				<Often />
				<Classify />
			</div>
		)
	}
}
