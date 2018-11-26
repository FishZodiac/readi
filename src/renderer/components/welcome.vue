<template>
  <div class="welcome">
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container columns">
          <div class="column">
            <h1 class="title">
              Read I
            </h1>
            <h2 class="subtitle">
              read interest -- 兴趣阅读平台
            </h2>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="tags">
                  <span class="tag is-medium" :class="[item.active?tagColor[index%6]:'']" v-for="(item,index) in tags" :key="index" @click="subscribeTag(index)">{{item.name}}
                  </span>
                </div>
              </div>
              <footer class="card-footer">
                <p class="card-footer-item">
                  <span @click="doSubscribe">
                    确认订阅
                  </span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { tags, tagColor } from '../common/tag';
export default {
  name: 'welcome',
  data() {
    return {
      tags,
      tagColor,
    };
  },
  methods: {
    subscribeTag(index) {
      this.tags[index].active = !this.tags[index].active;
    },
    doSubscribe() {
      const subscribeInfo = this.tags.filter(item => item.active && item);
      localStorage.setItem('subscribeInfo', JSON.stringify(subscribeInfo));
      this.$router.push('home');
    },
  },
  created() {
    if (localStorage.getItem('subscribeInfo')) {
      const val = JSON.parse(localStorage.getItem('subscribeInfo'));
      this.tags.forEach((item) => {
        if (val.findIndex(it => it.name === item.name) > -1) {
          item.active = true;
        }
      });
    }
  },
};
</script>
<style scoped>
.title {
  font-size: 48px;
}
.subtitle {
  font-size: 36px;
}
.tag {
  transition: all 0.5s;
  cursor: pointer;
}
.tag:hover {
  transform: scale(1.1, 1.1);
}
.card-footer-item {
  cursor: pointer;
}
</style>


