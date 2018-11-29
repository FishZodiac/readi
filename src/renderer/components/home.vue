<template>
  <div class="home">
    <section class="hero is-success">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-three-quarters">
              <h1 class="title">
                <router-link
                  tag="a"
                  to="welcome"
                  style="font-size:30px;font-weight:700;color:#fff"
                > READ I</router-link>
              </h1>
              <h2 class="subtitle">
                兴趣阅读平台
              </h2>
            </div>
            <div class="column">
              <br>
              <input
                class="input is-rounded"
                type="text"
                v-model="filt"
                placeholder="列表标题"
              >
            </div>
          </div>

          <div>

          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
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
          <div class="column is-four-fifths subscribeMain">
            <Loading v-if="isLoading" />
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
            <div
              class="backtop"
              @click="backtop"
            >
              <span class="icon">
                top
              </span>
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
import Loading from '../base/loading.vue';
export default {
  name: 'home',
  data() {
    return {
      filt: '',
      tagColor,
      currTag: 'guanzhi',
      subscribe: [{ name: '每日一文', url: 'guanzhi', active: true }],
      originList: [],
      list: [],
      detail: null,
      isLoading: true,
    };
  },
  created() {
    if (localStorage.getItem('subscribeInfo')) {
      this.subscribe = JSON.parse(localStorage.getItem('subscribeInfo'));
      this.currTag = this.subscribe[0].url;
    } else {
      this.$router.push({ path: '/welcome' });
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.isLoading = true;
      this.$http.get(`${HOST}${this.currTag}`)
        .then((res) => {
          const json = this.fnXml2json(res.data);
          this.isLoading = false;
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
            this.originList = arr;
            this.list = arr;
          } else {
            this.detail = json.rss.channel.item;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          alert('网络错误！');
        });
    },
    tagI(val) {
      if (this.currTag === val) {
        return;
      }
      this.detail = null;
      this.list = [];
      this.currTag = val;
      this.getInfo();
    },
    backtop() {
      window.scrollTo(0, 0);
    },
  },
  watch: {
    filt(oldv, newv) {
      if (newv === '') {
        this.list = this.originList;
        return;
      }
      if (oldv !== newv && this.list) {
        // eslint-disable-next-line
        this.list = this.originList.filter((item) => {
          if (item.title.indexOf(newv) > -1) { return item; }
        });
      }
    },
  },
  components: {
    Loading,
  },
};
</script>
<style scoped>
.home {
}
.hero {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: 0.9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.hero-body {
  padding: 1rem 1.5rem;
}
.section {
  margin-top: 100px;
}
.tags {
  position: fixed;
  width: 16%;
  max-height: 400px;
  overflow-y: scroll;
}
.tags .tag {
  width: 100%;
  display: block;
  cursor: pointer;
  height: 2.5em;
  line-height: 2.5em;
  margin-right: 0;
  opacity: 0.9;
}
.backtop {
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  padding: 15px;
  border-radius: 50%;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}
.subscribeMain {
}
</style>
<style>
.content img {
  max-width: 300px;
}
</style>

