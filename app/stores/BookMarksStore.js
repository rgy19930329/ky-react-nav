/**
 * bookmarks store
 * @author ranguangyu
 * @date 2019-7-1
 */

import { observable, action } from "mobx";

export default class BookMarksStore {
  @observable status = "edit"; // 页面状态

  @action
  goEdit() {
    this.status = "edit";
  }

  @action
  goDetail() {
    this.status = "read";
  }
}
