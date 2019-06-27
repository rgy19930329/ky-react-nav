/**
 * todolist store
 * @author ranguangyu
 * @date 2019-2-1
 */

import { observable, action } from "mobx";
import { fetch } from "@utils";

export default class TodoListStore {
  @observable dataSource = [];

  @action
  async load() {
    const result = await fetch({
      url: "/example/todolist",
    });
    if(result.code === "0000") {
      this.dataSource = result.data.list;
    }
  }

  @action
  add(item) {
    this.dataSource.unshift(item);
  }

  @action
  done(index) {
    this.dataSource[index]["status"] = "finished";
  }
}
