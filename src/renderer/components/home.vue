<template>
  <div class="home">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            兴趣阅读指南
          </h1>
          <h2 class="subtitle">
            找寻你的兴趣所在
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">

        <div class="tags are-medium">
          <span class="tag is-primary" @click="tagI('guanzhi')">每日一文</span>
          <span class="tag is-warning" @click="tagI('dapenti/tugua')">喷嚏</span>
          <span class="tag is-link" @click="tagI('toutiao/today')">开发者头条</span>
          <span class="tag is-info" @click="tagI('oschina/news')">开源中国</span>
          <span class="tag is-success" @click="tagI('mzitu/home')">妹子图</span>
          <span class="tag is-danger" @click="tagI('smzdm/ranking/pinlei/11/10')">好物</span>
          <span class="tag is-light" @click="tagI('3dm/news')">3DMGame</span>
        </div>
        <div>
          <div class="card" v-for="(item,index) in list" :key="index">
            <div class="card-content">
              <div class="content">
                <span v-if="!item.link">{{item.title}}</span>
                <a v-if="item.link" :href="item.link">{{item.title}}</a>
                <div v-html="item.description"></div>
              </div>
            </div>
          </div>
          <div class="card" v-if="detail">
            <div class="card-content">
              <div class="content">
                <span v-if="!detail.link">{{detail.title}}</span>
                <a v-if="detail.link" :href="detail.link">{{detail.title}}</a>
                <div v-html="detail.description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      currTag: 'guanzhi',
      list: [],
      detail: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get(`http://wx.limaogo.com/${this.currTag}`)
        .then((res) => {
          const json = this.fnXml2json(res.data);
          if (json.rss.channel.item.length) {
            this.list = json.rss.channel.item;
          } else {
            this.detail = json.rss.channel.item;
          }
        });
    },
    tagI(val) {
      this.currTag = val;
      this.getInfo();
    },
  },
};
</script>
<style scoped>
</style>
