/**
 * 根路由组件
 * @author ranguangyu
 * @date 2019-2-2
 */

import React from "react";
import AnimateRouter from "@components/Systems/AnimateRouter";

class RootRouter extends React.Component {
  render() {
    return (
      <div style={{ padding: 10 }}>
        <AnimateRouter />
      </div>
    )
  }
}

export default RootRouter;