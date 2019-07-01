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
import ClassifyDetail from "./components/Classify/detail";
import { observer, inject } from "mobx-react";

@inject("bookMarksStore")
@observer
export default class Home extends React.Component {
	render() {
		const { bookMarksStore: { status } } = this.props;
		return (
			<div className="page-home">
				<Header />
				<Often />
				{status === "edit" ? <Classify /> : <ClassifyDetail />}
			</div>
		)
	}
}
