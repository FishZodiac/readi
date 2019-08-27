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
              read interest 兴趣阅读平台
            </h2>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="tags">
                  <span
                    class="tag is-medium"
                    :class="[item.active?tagColor[index%6]:'']"
                    v-for="(item,index) in tags"
                    :key="index"
                    @click="subscribeTag(index)"
                  >{{item.name}}
                  </span>
                </div>
              </div>
              <footer class="card-footer">
                <p class="card-footer-item">
                  <span @click="doSubscribe">
                    开始旅程！
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
.welcome {
  overflow-y: hidden;
}
.hero.is-success {
  background: url("../assets/back.jpeg") no-repeat;
  background-size: cover;
}
.container {
  align-items: center;
}
.container .column .title {
  font-size: 48px;
}
.container .column .subtitle {
  color: #ffffff;
  text-shadow: 0 0 2px #000;
  font-size: 36px;
}
.tag {
  transition: all 0.5s;
  cursor: pointer;
}
.tag:hover {
  transform: scale(1.1, 1.1);
}
.card {
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
}
.card-content {
  max-height: 440px;
  overflow-y: scroll;
}
.card-footer-item {
  font-size: 18px;
  color: #fc687d;
  cursor: pointer;
}
/* .tag:not(body).is-primary {
  background-color: #20a3de;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-warning {
  background-color: #4794cf;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-link {
  background-color: #2dbdc8;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-info {
  background-color: #93bbe4;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-success {
  background-color: #81d1f7;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-danger {
  background-color: #84d2e2;
  color: rgba(255, 255, 255, 1);
} */
.tag:not(body).is-primary {
  background-color: #fc687d;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-warning {
  background-color: #fead76;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-link {
  background-color: #fef084;
  color: rgba(0, 0, 0, 0.6);
}
.tag:not(body).is-info {
  background-color: #84d47e;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-success {
  background-color: #28c1a3;
  color: rgba(255, 255, 255, 1);
}
.tag:not(body).is-danger {
  background-color: #b173ae;
  color: rgba(255, 255, 255, 1);
}
</style>


