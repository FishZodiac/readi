<template>
  <div class="home">
    <section class="hero is-light">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <router-link
                  tag="span"
                  to="{name:welcome}"
                  style="font-size:24px;font-weight:700"
                > READ I</router-link>
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container">
          <div class="tags are-medium">
            <span
              class="tag is-medium"
              :class="[item.active?tagColor[index%6]:'']"
              v-for="(item,index) in subscribe"
              :key="index"
              @click="tagI(item.url)"
            >{{item.name}}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <div>
          <article
            class="media"
            v-for="(item,index) in list"
            :key="index"
            v-if="!detail"
          >
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="item.image">
              </p>
            </figure>
            <div class="media-content">
              <div class="title">
                <a
                  v-if="item.link"
                  target="_blank"
                  :href="item.link"
                >{{item.title}}</a>
                <span v-if="!item.link">{{item.title}}</span>
              </div>
              <div
                class="content"
                v-html="item.description"
              >

              </div>
            </div>
          </article>
          <div
            class="card"
            v-if="detail"
          >
            <div class="card-content">
              <div class="content">
                <span v-if="!detail.link">{{detail.title}}</span>
                <a
                  v-if="detail.link"
                  target="_blank"
                  :href="detail.link"
                >{{detail.title}}</a>
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
import { HOST } from '../common/config.js';
import { tagColor } from '../common/tag';
import defaultimg from '../assets/default.png';
export default {
  name: 'home',
  data() {
    return {
      tagColor,
      currTag: 'guanzhi',
      subscribe: [{ name: '每日一文', url: 'guanzhi', active: true }],
      list: [],
      detail: {},
    };
  },
  created() {
    if (localStorage.getItem('subscribeInfo')) {
      this.subscribe = JSON.parse(localStorage.getItem('subscribeInfo'));
      this.currTag = this.subscribe[0].url;
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get(`${HOST}${this.currTag}`)
        .then((res) => {
          const json = this.fnXml2json(res.data);

          if (json.rss.channel.item.length) {
            const arr = json.rss.channel.item.map((item) => {
              // eslint-disable-next-line
              const img = item.description.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
              if (img) {
                // eslint-disable-next-line
                item.image = img[1];
              } else {
                item.image = defaultimg;
              }
              return item;
            });
            console.log(arr);
            this.list = arr;
          } else {
            this.detail = json.rss.channel.item;
          }
        });
    },
    tagI(val) {
      this.detail = null;
      this.currTag = val;
      this.getInfo();
    },
  },
};
</script>
<style scoped>
a {
  color: #333;
  font-size: 24px;
}
a:hover {
  text-decoration: underline;
}
.tag {
  cursor: pointer;
}
</style>
<style>
.content img {
  width: 300px;
}
</style>

