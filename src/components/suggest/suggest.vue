<template>
  <scroll class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item">
        <div class="icon">
          <i></i>
        </div>
        <div class="name">
          <p class="text"></p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
import { searchHotKey, searchHotKeySuggest } from '@/api/search'
export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: 0
    }
  },
  methods: {
    _search () {
      searchHotKey(this.query, this.page)// 两个异步的请求
      searchHotKeySuggest(this.query)
    }
  },
  watch: {
    query () {
      this._search()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable';
@import '../../assets/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>