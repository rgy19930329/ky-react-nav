/**
 * auth store
 * @author ranguangyu
 * @date 2019-2-2
 */

import { observable, action } from "mobx";
import { fetch } from "@utils";

export default class AuthStore {
  @observable authList = [];

  @action
  async load() {
    const result = await fetch({
      url: "/example/resource",
    });
    if(result.code === "0000") {
      this.authList = result.data;
    }
  }
}
