/**
 * 动画路由组件
 * @author ranguangyu
 * @date 2019-01-31
 */

import "./index.less";
import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import NotFound from "@components/Systems/NotFound";

import Home from "@pages/home";

@withRouter
class AnimateRouter extends React.Component {
  render() {
    const location = this.props.location;
    return (
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="message"
        >
          <Switch location={location}>
            <Route path="/home" component={Home} />
            <Route path="/" exact={true} component={Home} />
            <Redirect from="/" exact={true} to="/home" />
            <Route path="*" component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default AnimateRouter;