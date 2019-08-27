<template>
  <div class="home">
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
            <div class="logo">
              <h1 class="title">
                <router-link
                  tag="a"
                  to="welcome"
                  style="font-size:30px;font-weight:700;color:#333"
                > READ I</router-link>
              </h1>
              <h2 class="subtitle">
                兴趣阅读平台
              </h2>
            </div>
            <div class="tags are-medium">
              <span
                class="tag is-medium"
                :class="[item.active?tagColor[index%6]:'']"
                v-for="(item,index) in subscribe"
                :key="index"
                @click="tagI(item)"
              >{{item.name}}</span>
            </div>
            <router-link
              tag="span"
              class="tag editSubcribe"
              to="welcome"
            >
              编辑订阅
            </router-link>
          </div>
          <div class="column is-four-fifths subscribeMain">
            <section class="operate">
              <div class="columns">
                <div class="column">
                  <b-field v-if="currChildTag">
                    <b-radio-button
                      v-for="(item, index) in currChildTag"
                      :key="index"
                      v-model="childTagIndex"
                      name="name"
                      :native-value="index"
                      type="is-success"
                    >
                      {{item}}
                    </b-radio-button>
                  </b-field>
                </div>
                <div class="column">
                  <b-input
                    v-model="filt"
                    placeholder="列表标题"
                  ></b-input>
                </div>
              </div>

            </section>
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
                    <span
                      class="tag clip-to is-link"
                      @click="clipTo(item.link)"
                    >复制链接</span>
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
                    <span
                      class="tag clip-to is-link"
                      @click="clipTo(detail.link)"
                    >复制链接</span>
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
// eslint-disable-next-line import/no-extraneous-dependencies
import { clipboard } from 'electron';
import { HOST } from '../common/config.js';
import { tagColor } from '../common/tag';
import defaultimg from '../assets/default.png';
import Loading from '../base/loading.vue'; // eslint-disable-line
export default {
  name: 'home',
  data() {
    return {
      filt: '',
      tagColor,
      currTag: 'guanzhi',
      currChildTag: null,
      childTagIndex: null,
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
          this.$buefy.toast.open('网络错误！');
        });
    },
    tagI({ child = null, url }) {
      if (this.currTag === url) {
        return;
      }
      this.detail = null;
      this.list = [];
      this.currTag = url;
      if (child) {
        this.currChildTag = child;
        // eslint-disable-next-line prefer-destructuring
        this.childTagIndex = Object.keys(child)[0];
      }
      this.getInfo();
    },
    backtop() {
      window.scrollTo(0, 0);
    },
    clipTo(url) {
      console.log(url);
      this.$buefy.toast.open('已复制！');
      clipboard.writeText(url);
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
    childTagIndex(newv, oldv) {
      this.detail = null;
      this.list = [];
      this.currTag = this.currTag.replace(oldv, newv);
      this.getInfo();
    },
  },
  components: {
    Loading,
  },
};
</script>
<style scoped>
.home {
  background: #f5f5f5;
}
.logo {
  position: fixed;
  top: 20px;
}
.tags {
  position: fixed;
  top: 100px;
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
.editSubcribe {
  position: fixed;
  top: 520px;
}
.media {
  background: #ffffff;
  padding: 10px;
}
.media a,
.content a {
  color: #333333;
  font-size: 24px;
}
.backtop {
  position: fixed;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}

.subscribeMain {
}
.clip-to {
  cursor: pointer;
  float: right;
}
.operate {
  padding-bottom: 20px;
}
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
<style>
.content img {
  max-width: 300px;
}
</style>

